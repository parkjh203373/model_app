import joblib
import tensorflow as tf
from sklearn.preprocessing import StandardScaler
import pandas as pd
import numpy as np

def m1():
    print('test')
    scaler = joblib.load('./model/tip_scaler_all.pkl')
    virtual_data = pd.DataFrame({
        'total_bill': [25.00, 18.50, 32.75, 12.00, 40.00, 20.15, 15.60],
        'size': [3, 2, 4, 1, 5, 2, 3],
        'sex_Female': [0, 1, 0, 1, 0, 1, 0],
        'smoker_No': [1, 1, 0, 1, 0, 1, 1],
        'day_Fri': [0, 0, 0, 1, 0, 0, 0],
        'day_Sat': [0, 0, 1, 0, 0, 0, 0],
        'day_Sun': [1, 0, 0, 0, 1, 0, 0],
        'time_Dinner': [1, 0, 1, 1, 1, 0, 1]
    })

    data = scaler.transform(virtual_data)
    print(data[:5])

m1()