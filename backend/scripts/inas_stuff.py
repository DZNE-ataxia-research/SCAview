# %%
import pandas as pd

# %%
df = pd.read_pickle("../data/eav.pkl")

new_data = []

# %%
df = df[df['ATTRIBUTE'] != "COGIMP_INDICATOR"]
df

# %%
def get_attribute_value(element):
    element = element.reset_index(drop=True)
    if element.size>1:
        return element.iloc[0].item()
    else:
        return element.item()

def get_attribute_value_ts(element):
    element = element.reset_index(drop=True)
    if element.size>1:
        return element.iloc[0]
    else:
        return element.item()

def get_attribute_value_raw(element):
    element = element.reset_index(drop=True)
    if element.size>1:
        return str(element.iloc[0])
    else:
        return str(element.item())


all_pat = len(df['PID'].unique())

for i, pid in enumerate(df['PID'].unique()):
    print(f"{i+1}/{all_pat}")
    for vis in df[df['PID'] == pid]['VISIT'].unique():
        vis = int(vis)
        pid = str(pid)


        
        row = df[(df['PID'] == pid) & (df['VISIT'] == vis)]
        if row.empty:
            raise Exception(str(vis) + "  -  " + pid)

        TIMESTAMP = get_attribute_value_ts(row['TIMESTAMP'])
        SOURCE = get_attribute_value_raw(row['SOURCE'])
        VALUE = get_attribute_value_raw(row['VALUE'])
        PROVENANCE = get_attribute_value_raw(row['PROVENANCE'])
        CHECK = get_attribute_value_raw(row['CHECK'])
        OLD = get_attribute_value_raw(row['OLD'])
        ATTRIBUTE = row['ATTRIBUTE'].values

        
        
        '''
        isHyperreflexic = False
        isAreflexic = False
        hasEnoughData = False

        for att in ["BICEPS", "PATELLAR", "ACHILLES"]:
            data = row[row['ATTRIBUTE'] == att]
            if len(data)>1:
                print(data)
                data = data.reset_index(drop=True)
                #raise Exception("Duplicates...")
                data = data.iloc[0]
                print("duplicates....")
            if len(data)==0:
                continue
            else:
                hasEnoughData = True
                #print(data)
                if int(data['VALUE'].item()) == 1:
                    isHyperreflexic = True
                if int(data['VALUE'].item()) == 2:
                    isAreflexic = True

        if hasEnoughData:
            if isHyperreflexic:
                new_data.append([SOURCE, pid, vis, TIMESTAMP, "HYPERREFLEXIA", 1, PROVENANCE, OLD, CHECK])
            else:
                new_data.append([SOURCE, pid, vis, TIMESTAMP, "HYPERREFLEXIA", 0, PROVENANCE, OLD, CHECK])

            if isAreflexic:
                new_data.append([SOURCE, pid, vis, TIMESTAMP, "AREFLEXIA", 1, PROVENANCE, OLD, CHECK])
            else:
                new_data.append([SOURCE, pid, vis, TIMESTAMP, "AREFLEXIA", 0, PROVENANCE, OLD, CHECK])
        
        data = row[row['ATTRIBUTE'] == "EPR"]
        if not len(data) == 0:
            if int(data["VALUE"].item()) != 0:
                new_data.append([SOURCE, pid, vis, TIMESTAMP, "EPR_INDICATOR", 1, PROVENANCE, OLD, CHECK])
            else:
                new_data.append([SOURCE, pid, vis, TIMESTAMP, "EPR_INDICATOR", 0, PROVENANCE, OLD, CHECK])
        '''
        hasEnoughData = False
        isSpastic = False
        for att in ["SPAGAIT", "SPAUPLIMB", "SPALOLIMB"]:
            data = row[row['ATTRIBUTE'] == att]
            if not len(data) == 0:
                hasEnoughData = True
                if int(data['VALUE'].item()) != 0:
                    isSpastic = True
        if hasEnoughData:
            if isSpastic:
                new_data.append([SOURCE, pid, vis, TIMESTAMP, "SPA_INDICATOR", 1, PROVENANCE, OLD, CHECK])
            else:
                new_data.append([SOURCE, pid, vis, TIMESTAMP, "SPA_INDICATOR", 0, PROVENANCE, OLD, CHECK])
        '''
        hasEnoughData = False
        paresis = False
        for att in ["PAFACE","PAULPRO","PAULDIS","PALLPRO","PALLDIS"]:
            data = row[row['ATTRIBUTE'] == att]
            if not len(data) == 0:
                hasEnoughData = True
                if int(data['VALUE'].item()) != 0:
                    paresis = True
        
        if hasEnoughData:
            if paresis:
                new_data.append([SOURCE, pid, vis, TIMESTAMP, "PARESIS_INDICATOR", 1, PROVENANCE, OLD, CHECK])
            else:
                new_data.append([SOURCE, pid, vis, TIMESTAMP, "PARESIS_INDICATOR", 0, PROVENANCE, OLD, CHECK])
            
        hasEnoughData = False
        attrophy = False
        for att in ["MUSCFACE","MUSCULPRO","MUSCULDIS","MUSCLLPRO","MUSCLLDIS"]:
            data = row[row['ATTRIBUTE'] == att]
            if not len(data) == 0:
                hasEnoughData = True
                if int(data['VALUE'].item()) != 0:
                    attrophy = True
        if hasEnoughData:
            if attrophy:
                new_data.append([SOURCE, pid, vis, TIMESTAMP, "ATROPHY_INDICATOR", 1, PROVENANCE, OLD, CHECK])
            else:
                new_data.append([SOURCE, pid, vis, TIMESTAMP, "ATROPHY_INDICATOR", 0, PROVENANCE, OLD, CHECK])
        
        hasEnoughData = False
        fascirculation = False

        for att in ["FASFACE","FASUPLIMB","FASLOLIMB"]:
            data = row[row['ATTRIBUTE'] == att]
            if not len(data) == 0:
                hasEnoughData = True
                if int(data['VALUE'].item()) != 0:
                    fascirculation = True
        if hasEnoughData:
            if fascirculation:
                new_data.append([SOURCE, pid, vis, TIMESTAMP, "FAS_INDICATOR", 1, PROVENANCE, OLD, CHECK])
            else:
                new_data.append([SOURCE, pid, vis, TIMESTAMP, "FAS_INDICATOR", 0, PROVENANCE, OLD, CHECK])


        hasEnoughData = False
        myo = False
        for att in ["MYOFACE","MYOTRUNK","MYOUPLIMB","MYOLOLIMB"]:
            data = row[row['ATTRIBUTE'] == att]
            if not len(data) == 0:
                hasEnoughData = True
                if int(data['VALUE'].item()) != 0:
                    myo = True
        if hasEnoughData:
            if myo:
                new_data.append([SOURCE, pid, vis, TIMESTAMP, "MYO_INDICATOR", 1, PROVENANCE, OLD, CHECK])
            else:
                new_data.append([SOURCE, pid, vis, TIMESTAMP, "MYO_INDICATOR", 0, PROVENANCE, OLD, CHECK])

        hasEnoughData = False
        rigidy = False
        for att in ["RIGAX","RIGUPLIMB","RIGLOLIMB"]:
            data = row[row['ATTRIBUTE'] == att]
            if not len(data) == 0:
                hasEnoughData = True
                if int(data['VALUE'].item()) != 0:
                    rigidy = True
        if hasEnoughData:
            if rigidy:
                new_data.append([SOURCE, pid, vis, TIMESTAMP, "RIG_INDICATOR", 1, PROVENANCE, OLD, CHECK])
            else:
                new_data.append([SOURCE, pid, vis, TIMESTAMP, "RIG_INDICATOR", 0, PROVENANCE, OLD, CHECK])


        hasEnoughData = False
        chorea = False
        for att in ["CHOFACE","CHONECK","CHOTRUNK","CHOUPLIMB","CHOLOLIMB"]:
            data = row[row['ATTRIBUTE'] == att]
            if not len(data) == 0:
                hasEnoughData = True
                if int(data['VALUE'].item()) != 0:
                    chorea = True
        if hasEnoughData:
            if chorea:
                new_data.append([SOURCE, pid, vis, TIMESTAMP, "CHO_INDICATOR", 1, PROVENANCE, OLD, CHECK])
            else:
                new_data.append([SOURCE, pid, vis, TIMESTAMP, "CHO_INDICATOR", 0, PROVENANCE, OLD, CHECK])


        hasEnoughData = False
        distonie = False
        for att in ["DYSFACE","DYSNECK","DYSTRUNK","DYSUPLIMB","DYSLOLIMB"]:
            data = row[row['ATTRIBUTE'] == att]
            if not len(data) == 0:
                hasEnoughData = True
                if int(data['VALUE'].item()) != 0:
                    distonie = True
        if hasEnoughData:
            if distonie:
                new_data.append([SOURCE, pid, vis, TIMESTAMP, "DYS_INDICATOR", 1, PROVENANCE, OLD, CHECK])
            else:
                new_data.append([SOURCE, pid, vis, TIMESTAMP, "DYS_INDICATOR", 0, PROVENANCE, OLD, CHECK])

        hasEnoughData = False
        resting_tremor = False
        for att in ["RESTTRE"]:
            data = row[row['ATTRIBUTE'] == att]
            if not len(data) == 0:
                hasEnoughData = True
                if int(data['VALUE'].item()) != 0:
                    resting_tremor = True
        if hasEnoughData:
            if resting_tremor:
                new_data.append([SOURCE, pid, vis, TIMESTAMP, "RESTING_TUMOR_INDICATOR", 1, PROVENANCE, OLD, CHECK])
            else:
                new_data.append([SOURCE, pid, vis, TIMESTAMP, "RESTING_TUMOR_INDICATOR", 0, PROVENANCE, OLD, CHECK])
        
        
        hasEnoughData = False
        resting_tremor = False
        for att in ["RESTTRE"]:
            data = row[row['ATTRIBUTE'] == att]
            if not len(data) == 0:
                hasEnoughData = True
                if int(data['VALUE'].item()) != 0:
                    resting_tremor = True
        if hasEnoughData:
            if resting_tremor:
                new_data.append([SOURCE, pid, vis, TIMESTAMP, "RESTING_TUMOR_INDICATOR", 1, PROVENANCE, OLD, CHECK])
            else:
                new_data.append([SOURCE, pid, vis, TIMESTAMP, "RESTING_TUMOR_INDICATOR", 0, PROVENANCE, OLD, CHECK])


        hasEnoughData = False
        sensory = False

        for att in ["SSRIFO","SSLEFO"]:
            data = row[row['ATTRIBUTE'] == att]
            if not len(data) == 0:
                hasEnoughData = True
                if int(data['VALUE'].item()) != 0:
                    sensory = True
        if hasEnoughData:
            if sensory:
                new_data.append([SOURCE, pid, vis, TIMESTAMP, "SENSORY_INDICATOR", 1, PROVENANCE, OLD, CHECK])
            else:
                new_data.append([SOURCE, pid, vis, TIMESTAMP, "SENSORY_INDICATOR", 0, PROVENANCE, OLD, CHECK])


        hasEnoughData = False
        urinaty = False
        for att in ["URINDYS"]:
            data = row[row['ATTRIBUTE'] == att]
            if not len(data) == 0:
                hasEnoughData = True
                if int(data['VALUE'].item()) != 0:
                    urinaty = True
        if hasEnoughData:
            if urinaty:
                new_data.append([SOURCE, pid, vis, TIMESTAMP, "URIN_INDICATOR", 1, PROVENANCE, OLD, CHECK])
            else:
                new_data.append([SOURCE, pid, vis, TIMESTAMP, "URIN_INDICATOR", 0, PROVENANCE, OLD, CHECK])
        

        hasEnoughData = False
        cogimp = False

        for att in ["COGIMP"]:
            data = row[row['ATTRIBUTE'] == att]
            if not len(data) == 0:
                hasEnoughData = True
                if int(data['VALUE'].item()) != 0:
                    cogimp = True
        if hasEnoughData:
            if cogimp:
                new_data.append([SOURCE, pid, vis, TIMESTAMP, "COGIMP_INDICATOR", 1, PROVENANCE, OLD, CHECK])
            else:
                new_data.append([SOURCE, pid, vis, TIMESTAMP, "COGIMP_INDICATOR", 0, PROVENANCE, OLD, CHECK])

        hasEnoughData = False
        brain_ocu = False 
        for att in ["OPHHORIZONT","OPHVERTICAL","SLOWSACC"]:
            data = row[row['ATTRIBUTE'] == att]
            if not len(data) == 0:
                hasEnoughData = True
                if int(data['VALUE'].item()) != 0:
                    brain_ocu = True
        if hasEnoughData:
            if brain_ocu:
                new_data.append([SOURCE, pid, vis, TIMESTAMP, "BRAINSTEM_OCU_INDICATOR", 1, PROVENANCE, OLD, CHECK])
            else:
                new_data.append([SOURCE, pid, vis, TIMESTAMP, "BRAINSTEM_OCU_INDICATOR", 0, PROVENANCE, OLD, CHECK])
        '''



        

# %%



pd.DataFrame(columns=df.columns, data = new_data)
# %% 
        
pd.concat([df, pd.DataFrame(columns=df.columns, data = new_data)]).to_pickle("../data/eav.pkl")
# %%
