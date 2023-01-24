# %%
import pandas as pd
# %%
df = pd.read_pickle("../data/eav.pkl")
df.to_pickle("../data/eav_20_1_22.pkl")
# %%
mutation = df[(df['ATTRIBUTE'] == "CARRIER") & (df['VALUE'] == 2)]
indeces = mutation.index
# %%

df = df.drop(index=indeces)

# %%
df.to_pickle("../data/eav.pkl")

# %%
