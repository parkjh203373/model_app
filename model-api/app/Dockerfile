# --- 1단계: Gradle 환경에서 소스 코드 컴파일 및 JAR 생성 ---
# Java 21 버전이 포함된 Gradle 빌드 전용 이미지를 가져오고 이름을 'build'로 지정합니다.
FROM gradle:8-jdk21 AS build

# 컨테이너 내부에서 작업할 디렉토리를 지정합니다.
WORKDIR /app

# 현재 내 컴퓨터에 있는 Spring Boot 프로젝트의 전체 소스 코드를 컨테이너 안으로 복사합니다.
COPY . .

# Windows 환경에서 파일 복사 시 소실되는 실행 권한을 명시적으로 추가합니다.
RUN chmod +x gradlew

# Gradle Wrapper를 이용해 이전 빌드 기록을 지우고, 실행 가능한 최종 JAR 파일을 빌드합니다.
RUN ./gradlew clean bootJar


# --- 2단계: 경량화된 Java 환경에서 JAR 파일만 실행 ---
# 실행 환경에는 빌드 툴이 필요 없으므로, Java 21 실행 환경(JRE)만 담긴 가벼운 이미지를 가져옵니다.
FROM eclipse-temurin:21-jre

# 컨테이너 내부 작업 디렉토리를 지정합니다.
WORKDIR /app

# 1단계(build)에서 완성된 JAR 배포 파일 중 실행 가능한 bootJar(app-0.0.1-SNAPSHOT.jar)만 지정하여 복사합니다.
COPY --from=build /app/build/libs/app-0.0.1-SNAPSHOT.jar app.jar

# Spring Boot 어플리케이션이 외부와 통신할 기본 포트 8080을 열어줍니다.
EXPOSE 8080

# 컨테이너가 켜지는 순간, Java 명령어를 실행하여 복사해 온 app.jar 파일을 구동시킵니다.
CMD ["java", "-jar", "app.jar"]