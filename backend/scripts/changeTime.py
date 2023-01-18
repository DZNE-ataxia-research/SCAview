# %%
import pandas as pd
import copy
import numpy as np

df = pd.read_pickle("eav.pkl")


# %%

## change dob 

for i, row in df.iterrows():
    if row['ATTRIBUTE'] in ["DOB", "ONSET_GAIT"]:
        ts = copy.deepcopy(row['VALUE'])
        if (ts.day == 1) and (ts.month == 1):
            print(ts)
            n_ts = ts.replace(day = 2, month = 7)            
            df.at[i, "VALUE"] = n_ts
# %%

## fix age onset gait 

for pid in df['PID'].unique():
     for vis in df[df['PID'] == pid]['VISIT'].unique():
        vis = int(vis)
        pid = str(pid)        
        row = df[(df['PID'] == pid) & (df['VISIT'] == vis)]

        DOB = row[row['ATTRIBUTE'] == "DOB"]['VALUE']
        ONSET_GAIT = row[row['ATTRIBUTE'] == "ONSET_GAIT"]['VALUE']

        if len(DOB)>0 and len(ONSET_GAIT)>0:
            DOB = DOB.values[0]
            ONSET_GAIT = ONSET_GAIT.values[0]
            AGE_ONSET = ONSET_GAIT - DOB
            AGE_ONSET = AGE_ONSET / np.timedelta64(1, 'Y')

            old_onset_age = row[row['ATTRIBUTE'] == "AGE_ONSET_GAIT"]['VALUE']

            if len(old_onset_age) > 0:
                index = int(old_onset_age.index[0])
                df.at[index, "VALUE"] = AGE_ONSET
                #print(old_onset_age.index)

            






# %%
df.to_pickle("eav_age_onset_gait_fixed.pkl")
# %%
