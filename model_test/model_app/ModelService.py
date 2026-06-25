import joblib
import tensorflow as tf
import pandas as pd
import os

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
ec_path = os.path.join(BASE_DIR, "model", "encode_columns.joblib")
scaler_path = os.path.join(BASE_DIR, "model", "tip_scaler_all.pkl")
model_path = os.path.join(BASE_DIR, "model", "tips_predict_model.keras")

ec = joblib.load(ec_path)
scaler = joblib.load(scaler_path)
model = tf.keras.models.load_model(model_path, compile=False)

iris_scaler_path = os.path.join(BASE_DIR, "model", "iris_scaler.pkl")
iris_encoder_path = os.path.join(BASE_DIR, "model", "iris_label_encoder.pkl")
iris_model_path = os.path.join(BASE_DIR, "model", "iris_model.keras")

iris_scaler = joblib.load(iris_scaler_path)
iris_encoder = joblib.load(iris_encoder_path)
iris_model = tf.keras.models.load_model(iris_model_path, compile=False)

def m1(data):
    try:
        # 1. raw dict 데이터를 DataFrame으로 변환
        d = pd.DataFrame([data])

        # 수치형 변수의 타입을 변환 (문자열로 들어왔을 경우 대비)
        if 'total_bill' in d.columns:
            d['total_bill'] = pd.to_numeric(d['total_bill'])
        if 'size' in d.columns:
            d['size'] = pd.to_numeric(d['size'])

        # 범주형 데이터 원-핫 인코딩 수행
        x = pd.get_dummies(d)

        # encode_columns 리스트 순서에 맞게 인덱스를 재정렬하고 없는 컬럼(카테고리)은 0으로 채움
        x = x.reindex(columns=ec, fill_value=0)

        # 2. Scale 적용
        scaled_data = scaler.transform(x)

        # 3. 모델을 사용해 팁 예측
        prediction = model.predict(scaled_data)
        tip_value = float(prediction[0][0])
        
        # 소수점 둘째 자리까지 반올림
        predicted_tip = round(tip_value, 2)
        
        print(f"입력 데이터: {data} -> 예측 팁: {predicted_tip}")
        return predicted_tip

    except Exception as e:
        print(f"예측 도중 에러 발생: {e}")
        raise e

def m2(data):
    try:
        # 1. raw dict 데이터를 DataFrame으로 변환
        d = pd.DataFrame([data])

        # 수치형 변수의 타입을 변환 (문자열로 들어왔을 경우 대비)
        for col in ['sepal_length', 'sepal_width', 'petal_length', 'petal_width']:
            if col in d.columns:
                d[col] = pd.to_numeric(d[col])

        # 2. Scale 적용
        scaled_data = iris_scaler.transform(d)

        # 3. 모델을 사용해 클래스 예측
        prediction = iris_model.predict(scaled_data)
        # prediction shape is (1, 3), get the index of the highest probability
        predicted_class_idx = int(prediction.argmax(axis=1)[0])
        
        # 라벨 인코더를 사용해 클래스 이름 복원
        predicted_class = iris_encoder.inverse_transform([predicted_class_idx])[0]
        
        print(f"입력 데이터: {data} -> 예측 Iris: {predicted_class}")
        return predicted_class

    except Exception as e:
        print(f"예측 도중 에러 발생: {e}")
        raise e