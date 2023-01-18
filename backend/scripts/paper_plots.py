# %%
import seaborn as sns
from numpy.random import normal
import numpy as np
from matplotlib import pyplot as plt

arr1 = np.array([12.3, 14.1, 13.0, 18.3, 14.7, 13.9 , 12.9, 14.4, 14.4, 14.2])
arr1.var()
# %%
artificial_arr = normal(0, arr1.var(), 10)
artificial_arr = [arr1[i] + artificial_arr[i] for i in range(10)]


artificial_arr2 = normal(0, arr1.var()*0.7, 10)
artificial_arr2 = [arr1[i] + artificial_arr2[i] for i in range(10)]


artificial_arr3 = normal(0, arr1.var()*0.4, 10)
artificial_arr3 = [arr1[i] + artificial_arr3[i] for i in range(10)]

# %%
sns.displot([arr1, artificial_arr, artificial_arr2, artificial_arr3], kind="kde")

plt.legend(['b=0.4', 'b=0.7', 'b=1', 'Original data'])


plt.savefig("b_values.png")
# %%
