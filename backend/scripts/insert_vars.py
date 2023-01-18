# %%
import pandas as pd
import copy
df = pd.read_pickle("eav.pkl")


n_data = []

df = df.reset_index(drop=True)


# %%
attvprat_index = df[df['ATTRIBUTE']!= "ATTVSPRATT"].index



df = df.loc[attvprat_index]

attvprat_index = df[df['ATTRIBUTE']== "ATTVSPRATT"].index

attvprat_index
# %%
for i , row in df.iterrows():
    if row['ATTRIBUTE'] == "SARASUM":
        PID = row['PID']
        VISIT = row['VISIT']
        TIMESTAMP = row['TIMESTAMP']
        SOURCE = row['SOURCE']
        VALUE = row['VALUE']
        PROVENANCE = row['PROVENANCE']
        CHECK = row['CHECK']
        OLD = row['OLD']


        if VALUE >=3:
            n_data.append([SOURCE, PID, VISIT, TIMESTAMP, "ATTVSPRATT", 1, PROVENANCE, OLD, CHECK])
        else:
            n_data.append([SOURCE, PID, VISIT, TIMESTAMP, "ATTVSPRATT", 0, PROVENANCE, OLD, CHECK])


df_attvspratt = pd.DataFrame(columns=['SOURCE', "PID", "VISIT", "TIMESTAMP", "ATTRIBUTE", "VALUE", "PROVENANCE", "OLD", "CHECK"], data=n_data)


df_new = pd.concat([df,df_attvspratt])

# %%
df_new.to_pickle("df_with_attxvsprattx.pkl")

# %%

## change dob 

for i, row in df.iterrows():
    if row['ATTRIBUTE'] in ["DOB", "AGE_ONSET_GAIT"]:
        ts = copy.deepcopy(row['TIMESTAMP'])
        if (ts.day == 2) and (ts.month == 7):
            print(ts)
            #n_ts = ts.replace(day = 2, month = 7)
            
            #df.at[i, "TIMESTAMP"] = n_ts
            






# %%

df.to_pickle("eav_with_2_7_dates.pkl")
# %%


pids_SCA_3 = list(df[(df['ATTRIBUTE'] == "SCACAT") & (df['VALUE'] == 3)]['PID'].values)

# %%
data_to_append = []
for pid in pids_SCA_3:
    line = copy.deepcopy(df[(df['PID'] == pid) & (df['ATTRIBUTE'] == "SCACAT")].values.tolist()[0])
    line[4] = "SCACAT2"
    line[5] = 0
    data_to_append.append(line)

# %%
df = pd.concat([df, pd.DataFrame(data=data_to_append, columns=df.columns)])
# %%
df.to_pickle("eav_with_SCACAT2_0_from_SCACAT_3.pkl")
# %%
