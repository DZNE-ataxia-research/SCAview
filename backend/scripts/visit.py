# %%
import pandas as pd
import numpy as np

df = pd.read_pickle("eav.pkl")



# %%
df.TIMESTAMP.value_counts()

# %%







df_mischa = pd.read_pickle("eav_newvisits.pkl")

# %%
df.VISIT.value_counts()
# %%
df_mischa.VISIT.value_counts()
# %%
display(df[(df['VISIT'] == 3) & (df['ATTRIBUTE'] == "SARASUM")])

# %%
display(df_mischa[(df_mischa['VISIT'] == 3) & (df_mischa['ATTRIBUTE'] == "SARASUM")])
# %%
df.TIMESTAMP.dtype
# %%
eav = df_mischa
df = df_mischa[df_mischa.ATTRIBUTE == "SARASUM"]
display(df.TIMESTAMP -  df.PID.replace(eav[eav.PID.isin(df.PID.unique().tolist())].replace(pd.to_datetime('1900-01-01'), pd.NaT).replace(pd.to_datetime('1900-07-02'), pd.NaT).sort_values(by=('TIMESTAMP')).groupby('PID').first()['TIMESTAMP'].to_dict()))
# %%

# %%
df[df.TIMESTAMP == pd.to_datetime('1900-07-02')]
# %%
