# check duplicates
# type (eg code = 6.0 crashed)
# ERROR handling (sofort raus und in log file ?)


import pandas as pd
import os
import numpy as np
import math
import winsound
from datetime import datetime


def importer(source):
    ##### INITIALIZE #####

    precision = pd.Timedelta('60 days')
    root = 'C:/users/user/sciebo/idsnrecent/DATA/'
    fileModel = 'Datamodel.xlsx'

    print('Import Datamodel', end=' - ')

    # Load DM
    model_sources = pd.read_excel(root + fileModel, sheet_name='Sources')
    model_attr = pd.read_excel(root + fileModel, sheet_name='Attributes')
    model_code = pd.read_excel(root + fileModel, sheet_name='Codes')
    model_attrmap = pd.read_excel(root + fileModel, sheet_name='Attribute_Mappings')
    model_codemap = pd.read_excel(root + fileModel, sheet_name='Code_Mappings')
    model_calc = pd.read_excel(root + fileModel, sheet_name='Calculations')

    # Unify  DM
    model_attr.Topic = model_attr.Topic.str.upper()
    model_attr.Attribute = model_attr.Attribute.str.upper()
    model_attrmap.Source_Attribute = model_attrmap.Source_Attribute.str.upper()
    model_codemap.Source_Value = model_codemap.Source_Value.astype(str).str.upper()
    model_calc.Function = model_calc.Function.str.upper()

    # select from DM
    model_attrmap = model_attrmap[model_attrmap.Source == source]
    model_calc = model_calc[model_calc.Source == source]

    model_sources = model_sources.fillna('')
    PID = model_sources.loc[model_sources.Abbreviation == source, 'PID_colname'].values[0]  # 'Re-Pseudonym'
    SITE = model_sources.loc[model_sources.Abbreviation == source, 'SITE_colname'].values[0]  # 'visdat'
    TS = model_sources.loc[model_sources.Abbreviation == source, 'TIMESTAMP_colname'].values[0]  # 'visdat'
    SEP = model_sources.loc[model_sources.Abbreviation == source, 'Column_separator'].values[0]  # ';'
    NOVALUE = model_sources.loc[model_sources.Abbreviation == source, 'Missing_values'].values[0]  # '.'
    SRCKEY = model_sources.loc[model_sources.Abbreviation == source, 'Key'].values[0]
    TSFORMAT = model_sources.loc[model_sources.Abbreviation == source, 'Timestamp_format'].values[0]

    print('done')


    ##### IMPORT / MAPPING / SANITIZING #####

    def attribute_mapping(sCol):
        if sCol in model_attrmap.Source_Attribute.values:
            return 'AM', model_attrmap[model_attrmap.Source_Attribute == sCol.upper()].Target_Attribute.values[0], \
                   model_attrmap[model_attrmap.Source_Attribute == sCol.upper()].Transformation.values[0]
        elif sCol in model_attr.Attribute.values:
            return 'INC', sCol, ''
        else:
            return 'NOTFOUND', '', ''


    def code_mapping(eav, transform):
        if 'cm' in str(transform):
            codemap = model_codemap[model_codemap.Code_Mapping == transform].set_index('Source_Value').loc[:,'Core_Equivalent'].to_dict()
            eav.loc[:, 'VALUE'] = eav.VALUE.str.upper().map(codemap).fillna('###')
            eav.loc[:, 'CHECK'] = 'AM / CM'
            eav.loc[eav.VALUE == '###', 'CHECK'] = 'ERROR: code not in mapping'
            eav.loc[eav.VALUE == '###', 'VALUE'] = np.nan
        return eav


    def sanitizing(eav):
        if len(eav) == 0:
            return eav

        model = model_attr[model_attr.Attribute == eav.ATTRIBUTE.values[0]]
        datatype = model.Datatype.values[0]

        if datatype in ['float', 'int']:
            eav.loc[:, 'VALUE'] = eav.VALUE.str.replace(',', ".")
            for char in ['%', ' ', '<', '>']:
                eav.loc[:, 'VALUE'] = eav.VALUE.str.replace(char, "")
            eav.loc[:, 'VALUE'] = pd.to_numeric(eav.VALUE, errors='coerce')

            if datatype == 'int':
                eav.loc[eav.VALUE.astype(float).mod(1) != 0, 'VALUE'] = np.nan

            eav.loc[eav.VALUE.isna(), 'CHECK'] = 'ERROR: type missmatch'

            domain = model.Domain.values[0]
            if pd.notna(domain):
                domain = domain.replace(' ', '')
                domain = domain.replace('[:', '[-inf:').replace(':]', ':inf]')
                domain = domain.replace('[', '').replace(']', '').split(':')
                domain = [float(i) for i in domain]
                eav.loc[(eav.VALUE < domain[0]) | (eav.VALUE > domain[1]), 'CHECK'] = 'ERROR: value out of range'

        if datatype == 'code':
            eav.loc[:, 'VALUE'] = pd.to_numeric(eav.VALUE, errors='coerce', downcast='integer')
            keys = model_code[model_code.Code == model.Domain.values[0]].Key.values
            eav.loc[~eav.VALUE.isin(keys), 'CHECK'] == 'ERROR: value not in codelist'
            eav.loc[~eav.CHECK.str.contains('ERROR')]

        if datatype == 'date':
            eav.loc[:, 'VALUE'] = pd.to_datetime(eav.VALUE.str.replace('.', '/'), errors='coerce')
            eav.loc[eav.VALUE.isna(), 'CHECK'] = 'ERROR: no valid date'

        if model.Topic.values[0] == 'MASTER':
            eav.loc[:, 'TIMESTAMP'] = pd.to_datetime('1900-1-1')
            eav.loc[eav.PID.duplicated(), 'CHECK'] = 'ERROR: duplicated master attribute'

        return eav


    print('Import and map Data ', end=' - ')

    eav = pd.DataFrame([],
                       columns=['SOURCE', 'PID', 'VISIT', 'TIMESTAMP', 'ATTRIBUTE', 'VALUE', 'PROVENANCE', 'OLD', 'CHECK'])
    errorlog = pd.DataFrame([], columns=['SOURCE', 'PID', 'VISIT', 'TIMESTAMP', 'ATTRIBUTE', 'VALUE', 'PROVENANCE', 'OLD',
                                         'CHECK'])

    for filename in os.listdir(root + source + '/data/'):
        if filename.endswith(".csv"):
            df = pd.read_csv(root + source + '/data/' + filename, sep=SEP, engine='python')
            if (PID not in df.columns) or (TS not in df.columns):
                # print('PATIENT ID or TIMESTAMP not found')
                pass
            else:
                if SITE != '':
                    df.loc[:, PID] = df[SITE].astype(str) + '_' + df[PID].astype(str)

                pid = df[PID]
                timestamp = pd.to_datetime(df[TS], format=TSFORMAT, errors='coerce')

                for sCol in df.columns:
                    check, att, transform = attribute_mapping(sCol.upper())
                    if check != 'NOTFOUND':# and att in ['SCACAT2']:
                        eavapp = pd.DataFrame([], columns=['SOURCE', 'PID', 'VISIT', 'TIMESTAMP', 'ATTRIBUTE', 'VALUE',
                                                           'PROVENANCE', 'OLD', 'CHECK'])
                        eavapp['PID'] = pid
                        eavapp['VISIT'] = -1
                        eavapp['TIMESTAMP'] = timestamp
                        eavapp['ATTRIBUTE'] = att
                        eavapp['VALUE'] = df[sCol].astype(str)
                        eavapp['SOURCE'] = source
                        eavapp['PROVENANCE'] = source
                        eavapp['OLD'] = df[sCol].astype(str)
                        eavapp['CHECK'] = check

                        eavapp = eavapp[~eavapp.VALUE.isin(['nan', 'NaN', 'null', '', NOVALUE])]

                        eavapp.loc[eavapp.TIMESTAMP.isna(), 'CHECK'] = 'ERROR: timestamp format incorrect'
                        errorlog = errorlog.append(eav[eav.CHECK.str.contains('ERROR')])
                        eav = eav[~eav.CHECK.str.contains('ERROR')]

                        eavapp = code_mapping(eavapp, transform)
                        errorlog = errorlog.append(eav[eav.CHECK.str.contains('ERROR')])
                        eav = eav[~eav.CHECK.str.contains('ERROR')]

                        eavapp = sanitizing(eavapp)
                        errorlog = errorlog.append(eav[eav.CHECK.str.contains('ERROR')])
                        eav = eav[~eav.CHECK.str.contains('ERROR')]

                        eav = eav.append(eavapp, ignore_index=True)

    print(len(eav[~eav.CHECK.str.contains('ERROR')]), 'correct datapoints from ', len(eav), 'imported')



    ##### POSTPROCESSING #####

    # generate source as attribute
    print('Generate SOURCE', end=' - ')

    eavapp = eav.drop_duplicates(subset='PID').copy()
    eavapp.loc[:, 'TIMESTAMP'] = pd.to_datetime('1900-1-1')
    eavapp.loc[:, 'ATTRIBUTE'] = 'SOURCE'
    eavapp.loc[:, 'VALUE'] = SRCKEY
    eavapp.loc[:, 'CHECK'] = 'NEW'
    eavapp.loc[:, 'OLD'] = ''
    eav = eav.append(eavapp, ignore_index=True)
    print('done')

    # generate baseline_date as attribute
    print('Generate BASELINE', end=' - ')

    eavapp = eav[eav.TIMESTAMP != pd.to_datetime('1900-1-1')].sort_values(by='TIMESTAMP').groupby(
        'PID').first().copy().reset_index(drop=False)
    eavapp = eavapp[['SOURCE', 'PID', 'VISIT', 'TIMESTAMP', 'ATTRIBUTE', 'VALUE', 'PROVENANCE', 'OLD', 'CHECK']]
    eavapp.loc[:, 'VALUE'] = eavapp.TIMESTAMP
    eavapp.loc[:, 'TIMESTAMP'] = pd.to_datetime('1900-1-1')
    eavapp.loc[:, 'ATTRIBUTE'] = 'BASELINE'
    eavapp.loc[:, 'CHECK'] = 'NEW'
    eavapp.loc[:, 'OLD'] = ''
    eav = eav.append(eavapp, ignore_index=True)
    print('done')

    # define visits
    print('Define visits', end=' - ')

    eav = eav.sort_values(by='PID')
    eav = eav.sort_values(by='TIMESTAMP')

    eavnew = pd.DataFrame([], columns=['SOURCE', 'PID', 'VISIT', 'TIMESTAMP', 'ATTRIBUTE', 'VALUE', 'PROVENANCE', 'OLD',
                                       'CHECK'])

    patients = eav.groupby('PID')
    for pat, pateav in patients:
        pateav = pateav.reset_index(drop=True)
        pateav.loc[:, 'Dt'] = pateav.TIMESTAMP.diff()
        newvisits = pateav[pateav.Dt > precision]
        for vis in newvisits.index:
            pateav.loc[vis:, 'VISIT'] += 1
        eavnew = eavnew.append(pateav.drop(columns=['Dt']), ignore_index=True)
    eav = eavnew
    print('done')

    print(len(eav[eav.CHECK == 'NEW']), ' new masters included')


    ##### CALCULATION #####

    def exec1(target, operator, *attributes, **kwargs):
        # select and join datapoints
        operator = operator.lower()
        eav_list = [eav.loc[eav.ATTRIBUTE == att, ['PID', 'VISIT', 'TIMESTAMP', 'VALUE']].set_index('PID') for att in
                    attributes]
        for i, df in enumerate(eav_list):
            icols = [col + '_' + str(i) for col in df.columns]
            eav_list[i].columns = icols
        matches = eav_list[0].join(eav_list[1:], how='inner')
        matches = matches[matches.filter(regex='^VISIT_', axis=1).replace({-1: None}).nunique(axis=1) < 2]
        values = matches.filter(regex='^VALUE_', axis=1)

        check = 'CALC: ' + operator.upper()

        if operator in ['sum', 'min', 'max', 'mean']:
            val = values.astype(float).apply(operator, axis=1)
        elif operator == 'sub':
            val = values.iloc[:, 0].astype(float).sub(values.iloc[:, 1].astype(float))
        elif operator == 'div':
            val = values.iloc[:, 0].astype(float).div(values.iloc[:, 1].astype(float))
        elif operator == 'mul':
            val = values.iloc[:, 0].astype(float).mul(values.iloc[:, 1].astype(float))
        elif operator == 'addtime':
            val = values.iloc[:, 0].astype('datetime64[ns]') + pd.to_timedelta(values['VALUE_1'], unit=kwargs['UNIT'])
        elif operator == 'subtime':
            val = (values.iloc[:, 0].astype('datetime64[ns]') - values.iloc[:, 1].astype(
                'datetime64[ns]')) / np.timedelta64(1, kwargs['UNIT'])
        else:
            val = 0
            print('operator not known')
            check = 'ERROR: CALC operator not known: ' + operator.upper()

        # construct result df
        def avgTS(ts):
            return (ts.mean())

        eav_calc = pd.DataFrame({
            'SOURCE': source,
            'PID': matches.index,
            'VISIT': matches.filter(regex='^VISIT_', axis=1).replace({-1: None}).mean(axis=1).replace({None: -1}),
            'TIMESTAMP': matches.filter(regex='^TIMESTAMP_', axis=1).replace(datetime(1900, 1, 1), pd.NaT).apply(avgTS,
                                                                                                                 axis=1),
            'ATTRIBUTE': target,
            'VALUE': val,
            'PROVENANCE': source,
            'OLD': values.astype(str).values.tolist(),
            'CHECK': check
        })

        if (target in model_attr.Attribute.values) and (
                model_attr.loc[model_attr.Attribute == target, 'Topic'].values[0] == 'MASTER'):
            eav_calc.TIMESTAMP = datetime(1900, 1, 1)
            eav_calc.VISIT = -1
        else:
            eav_calc.TIMESTAMP = eav_calc.TIMESTAMP.fillna(datetime(1900, 1, 1))
            eav_calc.VISIT = eav_calc.VISIT.fillna(-1)

        return eav_calc

    print('Calculation:', end=' - ')

    for ind in model_calc.index:
        func = model_calc.loc[ind, 'Function'].replace(' ', '').replace(')', '').split('(')
        lst = func[1].split(',')
        lst = ['\'' + arg + '\',' for arg in lst if '=' not in arg] + [arg.replace('=', '=\'') + '\',' for arg in lst if
                                                                       '=' in arg]
        string = 'exec1(\'' + model_calc.loc[ind, 'Attribute'] + '\', \'' + func[0] + '\',' + ''.join(lst)[:-1] + ')'
        eav = eav.append(eval(string), ignore_index=True)

    print(len(eav[eav.CHECK.str.contains('CALC')]), 'attributes calculated')

    eav = eav[eav.ATTRIBUTE.isin(model_attr.Attribute.values)]

    # eliminate / mark duplicates
    eav = eav.sort_values(by=['PID', 'ATTRIBUTE', 'TIMESTAMP'])

    print('Save EAV', end=' - ')
    eav.to_excel(root + '/' + source + '/' + 'eav.xlsx')
    eav.to_pickle(root + '/' + source + '/' + 'eav.pkl')
    print('done')

    winsound.Beep(1000, 100)


for src in ['SCAregistry', 'CRC-SCA', 'EUROSCA', 'RISCA']:
    importer (src)