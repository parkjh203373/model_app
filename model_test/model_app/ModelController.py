# c:\PJH\workspace_python\model_app\model_test\model_app\ModelController.py
from fastapi import APIRouter
import ModelService as ms

router1 = APIRouter(
    tags=["tips model"]
)

router2 = APIRouter(
    tags=["iris model"]
)

@router1.post("/api2/tips")
def read_tips(data: dict):
    print("Java 백엔드로부터 요청을 받았습니다.")
    print("전달받은 데이터:", data)
    
    try:
        predicted_tip = ms.m1(data)
        return str(predicted_tip)
    except Exception as e:
        return {"error": f"Internal Prediction Error: {str(e)}"}

@router2.post("/api2/iris")
def read_iris(data: dict):
    print("Java 백엔드로부터 Iris 요청을 받았습니다.")
    print("전달받은 데이터:", data)
    
    try:
        predicted_iris = ms.m2(data)
        return str(predicted_iris)
    except Exception as e:
        return {"error": f"Internal Prediction Error: {str(e)}"}


