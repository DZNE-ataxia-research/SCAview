# %%

import pandas as pd



df = pd.read_pickle("eav.pkl")


# %%

orig_eurosca = pd.read_csv("original_daten/EUROSCA_all.csv", sep=";")
orig_crcsca = pd.read_csv("original_daten/p7301_12574_functiona.csv")
orig_risca = pd.read_csv("original_daten/RISCA_all.csv", sep=";")
orig_scaregistry = pd.read_csv("original_daten/scaregistry.csv")


# %%

# %%


def get_attribute_value(element):
    element = element.reset_index(drop=True)
    if element.size>1:
        if isinstance(element.iloc[0], str) or isinstance(element.iloc[0], int):
            return element.iloc[0]
        return element.iloc[0].item()
    else:
        
        return element.item()

def get_attribute_value_ts(element):
    element = element.reset_index(drop=True)
    if element.size>1:
        return element.iloc[0]
    else:
        return element

def get_attribute_value_raw(element):
    element = element.reset_index(drop=True)
    if element.size>1:
        return str(element.iloc[0])
    else:
        return str(element)


stage_map = {
    0 : 0,
    0.5 : 0, 
    1: 0, 
    1.5 : 1, 
    2 : 1, 
    2.5 : 1, 
    3 : 2, 
    3.5 : 2, 
    4: 2, 
    4.5: 2, 
    5 : 3, 
    5.5 : 3, 
    6: 3
}


# %%

## EUROSCA
n_data = []
for i, row in orig_eurosca.iterrows():
    print(str(i/orig_eurosca.size*100)+ "%")
    disease_stage = row['scastage']

    if str(disease_stage).lower() == "nan":
        continue
    pid = row['Participant_ID']
    visit_date = pd.to_datetime(row['visitdate'], infer_datetime_format=True)
    data = df[(df['PID'] == pid)]
    
    data = data[data['TIMESTAMP'] == visit_date]
    if data.size == 0 or data.empty:
        continue
    TIMESTAMP = get_attribute_value_ts(data['TIMESTAMP'])
    SOURCE = get_attribute_value(data['SOURCE'])
    
    PROVENANCE = get_attribute_value(data['PROVENANCE'])
    CHECK = get_attribute_value(data['CHECK'])
    OLD = get_attribute_value(data['OLD'])
    VISIT = get_attribute_value(data['VISIT'])
    try:
        n_data.append([SOURCE, pid, VISIT, TIMESTAMP, "DISEASE_STAGE", int(disease_stage), PROVENANCE, OLD, CHECK])
    except:
        print(i, row)
        raise Exception()

# %%

## CRC-SCA
for i, row in orig_crcsca.iterrows():

    print(str(i/orig_eurosca.size*100)+ "%")
    disease_stage = row['FunctionalStage']
    

    if str(disease_stage).lower() in ["nan", "."] :
        continue

    disease_stage = stage_map[int(disease_stage)]
    pid = row['Participant_ID']
    visit_date = pd.to_datetime(row['Visit_Date'], infer_datetime_format=True)


    data = df[(df['PID'] == pid)]
    
    data = data[data['TIMESTAMP'] == visit_date]

    if data.size == 0 or data.empty:
        continue
    TIMESTAMP = get_attribute_value_ts(data['TIMESTAMP'])
    SOURCE = get_attribute_value_raw(data['SOURCE'])
    
    PROVENANCE = get_attribute_value(data['PROVENANCE'])
    CHECK = get_attribute_value(data['CHECK'])
    OLD = get_attribute_value(data['OLD'])
    VISIT = get_attribute_value(data['VISIT'])
    try:
        n_data.append([SOURCE, pid, VISIT, TIMESTAMP, "DISEASE_STAGE", int(disease_stage), PROVENANCE, OLD, CHECK])
    except:
        print(i, row)
        raise Exception()

# %%

## RISCA

for i, row in orig_risca.iterrows():

    print(str(i/orig_risca.size*100)+ "%")
    disease_stage = row['scastage']

    if str(disease_stage).lower() == "nan":
        continue
    pid = row['Participant_ID']
    visit_date = pd.to_datetime(row['visitdate'], infer_datetime_format=True)
    data = df[(df['PID'] == pid)]
    
    data = data[data['TIMESTAMP'] == visit_date]

    if data.size == 0 or data.empty:
        continue
    TIMESTAMP = get_attribute_value_ts(data['TIMESTAMP'])
    SOURCE = get_attribute_value(data['SOURCE'])
    
    PROVENANCE = get_attribute_value(data['PROVENANCE'])
    CHECK = get_attribute_value(data['CHECK'])
    OLD = get_attribute_value(data['OLD'])
    VISIT = get_attribute_value(data['VISIT'])
    try:
        n_data.append([SOURCE, pid, VISIT, TIMESTAMP, "DISEASE_STAGE", int(disease_stage), PROVENANCE, OLD, CHECK])
    except:
        print(i, row)
        raise Exception()

    


    

# %%
pd.concat([df, pd.DataFrame(columns=df.columns, data = n_data)]).to_pickle("eav_disstage.pkl")