# 파이썬 3.10 버전이 설치된 우분투 기반의 가볍고 슬림한 프로덕션용 이미지를 가져옵니다.
FROM python:3.13-slim

# 컨테이너 내부에서 파이썬 코드가 돌아갈 기본 디렉토리를 /app으로 설정합니다.
WORKDIR /app

# 의존성 라이브러리 목록 파일인 requirements.txt를 컨테이너 내부로 먼저 복사합니다.
COPY requirements.txt .

# 불필요한 캐시 파일을 남기지 않는 옵션(--no-cache-dir)을 주어 파이썬 패키지들을 컨테이너 내부에 설치합니다.
RUN pip install --no-cache-dir -r requirements.txt

# 내 컴퓨터에 있는 FastAPI 소스 코드 전체를 컨테이너 안으로 복사합니다.
COPY . .

# FastAPI 애플리케이션이 외부와 통신할 기본 포트 8000을 열어줍니다.
EXPOSE 8000

# 컨테이너가 시작될 때 프로덕션용 ASGI 비동기 서버인 Uvicorn을 실행합니다.
# 외부(Nginx 등)의 접근을 허용하기 위해 --host 주소는 반드시 0.0.0.0으로 묶어주어야 합니다.
CMD ["uvicorn", "index:app", "--host", "0.0.0.0", "--port", "8000"]