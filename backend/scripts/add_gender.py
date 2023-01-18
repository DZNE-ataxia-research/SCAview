# %%

import pandas as pd



df = pd.read_pickle("eav.pkl")


# %%

gender_map = {
    1:0,
    2:1, 
}

def get_attribute_value(element):
    if element.size == 0:
        print("ERROR")
        print(element)
    element = element.reset_index(drop=True)
    if element.size>1:
        return element.iloc[0].item()
    else:
        return element.item()

def get_attribute_value_ts(element):
    element = element.reset_index(drop=True)
    if element.size>1:
        return element.iloc[0].item()
    else:
        return element.item()

def get_attribute_value_raw(element):
    element = element.reset_index(drop=True)
    if element.size>1:
        return str(element.iloc[0])
    else:
        return str(element)


orig_eurosca = pd.read_csv("original_daten/EUROSCA_all.csv", sep=";")
orig_crcsca = pd.read_csv("original_daten/p7301_12574_functiona.csv")
orig_risca = pd.read_csv("original_daten/RISCA_all.csv", sep=";")
orig_scaregistry = pd.read_csv("original_daten/scaregistry.csv")
n_data = []
for i, row in orig_eurosca.iterrows():
    pid = row['Participant_ID']
    gender = gender_map[int(row["gender"])]
    data = df[df['PID'] == pid]
    if data.size == 0:
        continue
    data = data[data['ATTRIBUTE'] =='DOB']
    n_row = []

    TIMESTAMP = get_attribute_value_ts(data['TIMESTAMP'])
    SOURCE = get_attribute_value(data['SOURCE'])
    
    PROVENANCE = get_attribute_value(data['PROVENANCE'])
    CHECK = get_attribute_value(data['CHECK'])
    OLD = get_attribute_value(data['OLD'])
    VISIT = get_attribute_value(data['VISIT'])


    n_data.append([SOURCE, pid, VISIT, TIMESTAMP, "SEX", gender, PROVENANCE, OLD, CHECK])



# %%

for i, row in orig_risca.iterrows():
    pid = row['Participant_ID']

    if str(row['gender']).lower() == "nan":
        continue
    gender = gender_map[int(row["gender"])]
    data = df[df['PID'] == pid]
    if data.size == 0:
        continue
    data = data[data['ATTRIBUTE'] == 'DOB']

    TIMESTAMP = get_attribute_value_ts(data['TIMESTAMP'])
    SOURCE = get_attribute_value(data['SOURCE'])
    
    PROVENANCE = get_attribute_value(data['PROVENANCE'])
    CHECK = get_attribute_value(data['CHECK'])
    OLD = get_attribute_value(data['OLD'])
    VISIT = get_attribute_value(data['VISIT'])


    n_data.append([SOURCE, pid, VISIT, TIMESTAMP, "SEX", gender, PROVENANCE, OLD, CHECK])





# %%




pd.concat([df, pd.DataFrame(columns=df.columns, data = n_data)]).to_pickle("eav_with_gender.pkl")




# %%
df[df['ATTRIBUTE'] == "SEX"]
# %%
df2 = pd.DataFrame(columns=df.columns, data = n_data)

df2[df2['ATTRIBUTE'] == "SEX"]
# %%
