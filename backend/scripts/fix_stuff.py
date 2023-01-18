# %%
import pandas as pd
import copy

df = pd.read_pickle("eav.pkl")

df_old = pd.read_pickle("eav_old_8_22.pkl")


df_old[df_old['ATTRIBUTE'].isin["SARASUM", "INAS_COUNT"]]
# %%
df[(df['ATTRIBUTE'] == "SARASUM") & (df['VISIT'] == 0 )]

# %%


df = pd.read_pickle("pkl")



# %%

for i, row in df.iterrows():
    
    ts = copy.deepcopy(row['TIMESTAMP'])
    if (ts.day == 1) and (ts.month == 1) and (ts.year == 1900):
        print(i)
        df.at[i, "VISIT"] = -1
# %%

df.to_pickle("eav_fixed.pkl")


# %%
