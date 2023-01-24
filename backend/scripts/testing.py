# %%
import pandas as pd

df = pd.read_pickle("../data/eav.pkl")


# %%
df[df.ATTRIBUTE == "SHEELLE"]
# %%