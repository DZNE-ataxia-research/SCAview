import pandas as pd
import sys

df = pd.read_pickle(sys.argv[1])
df.to_csv(sys.argv[2])
