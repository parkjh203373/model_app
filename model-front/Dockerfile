# --- 1단계: Node.js 환경에서 React 소스 빌드하기 ---
# 빌드용 베이스 이미지로 가볍고 안정적인 Node 20 alpine 버전을 사용하고, 이름을 'build'로 지정합니다.
FROM node:24-alpine AS build

# 컨테이너 내부에서 작업할 기본 디렉토리를 /app으로 설정합니다.
WORKDIR /app

# 라이브러리 설치를 위해 package.json과 package-lock.json을 먼저 복사합니다.
COPY package*.json ./

# 정의된 패키지(라이브러리)들을 컨테이너 내부에 설치합니다.
RUN npm install

# 내 컴퓨터에 있는 나머지 모든 React 소스 코드를 컨테이너 안으로 복사합니다.
COPY . .

# 소스 코드를 브라우저가 읽을 수 있는 HTML, CSS, JS 정적 파일로 빌드(압축)합니다.
RUN npm run build


# --- 2단계: 빌드된 결과물만 Nginx(웹 서버)로 옮겨서 배포하기 ---
# 실제 서비스 운영을 위해 가볍고 빠른 Nginx 웹 서버 이미지를 불러옵니다.
FROM nginx:alpine

# 1단계(build)에서 생성된 최종 결과물(dist 폴더)을 Nginx가 웹에 보여주는 경로로 복사합니다.
# (Vite 프로젝트는 /app/dist, CRA 프로젝트는 /app/build를 적어줍니다.)
COPY --from=build /app/dist /usr/share/nginx/html

# CORS 에러 방지 및 SPA 라우팅을 위해 작성한 커스텀 Nginx 설정(nginx.conf)을 덮어씌웁니다.
COPY nginx.conf /etc/nginx/conf.d/default.conf

# 웹 서버의 기본 통신 포트인 80번 포트를 외부에 개방합니다.
EXPOSE 80

# Nginx 서버를 백그라운드가 아닌 포그라운드(Foreground)로 실행하여 컨테이너가 꺼지지 않고 유지되게 합니다.
CMD ["nginx", "-g", "daemon off;"]