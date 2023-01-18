# %%
import pandas as pd

import numpy as np



df = pd.read_pickle("eav.pkl")



df.loc[[73362, 73363]]







# %%



# %%



df = df.reset_index(drop=True)
# %%
df.index
# %%
df.index.unique()

# %%
original_index = df.index

original_index
# %%

index_no_dublicates = df.astype(str).drop_duplicates().index
index_no_dublicates
# %%

set_diff = np.setdiff1d(original_index, index_no_dublicates)
# %%
original_index.shape[0] - set_diff.shape[0]

# %%
df_no_dup = df.loc[index_no_dublicates]
# %%

df_no_dup.to_pickle("eav_no_duplicates.pkl")



# %%
