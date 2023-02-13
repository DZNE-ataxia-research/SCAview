# %%
import pandas as pd

eav = pd.read_pickle("eav_with_inas_count.pickle")

orig_data = pd.read_csv("../original_daten/RISCA_ALL.csv", sep=";")


SOURCE = "RISCA"

eav[eav.PID.str.contains("SCA-BON-0017-0007")]

orig_data['Participant_ID'].unique().__len__()

orig_data = orig_data.dropna(subset=['inasscore'])

orig_data['inasscore'].value_counts()

# %%
n_data = [] 
not_found = 0
for i, row in orig_data.iterrows():
    pid = row['Participant_ID']
    date = row['visitdate']
    visit = row['visit']
    inas_count = row['inasscore']
    if not inas_count:
        print(i)
    q = eav[eav.PID == pid]
    if q.empty:
        not_found+=1
    else:
        q = q[q['TIMESTAMP'] == pd.to_datetime(date, dayfirst=True)]
        if q.empty:
            print(row)
            break
        else:
            vis = q.iloc[0].VISIT
            new_row = [SOURCE, pid, vis, pd.to_datetime(date, dayfirst=True), "INAS_COUNT", inas_count, SOURCE, "", "NEW"]
            n_data.append(new_row)



# %%
pd.concat([eav, pd.DataFrame(columns=eav.columns, data=n_data)]).to_pickle("eav_with_inas_count.pickle")
# %%
df = pd.read_pickle("eav_with_inas_count.pickle")
# %%
df[df.ATTRIBUTE == "INAS_COUNT"]['VALUE'].isnull().sum()

# %%
