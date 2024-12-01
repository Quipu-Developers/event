# 베이스 이미지로 Python 3.9 사용
FROM python:3.9-slim

# 필수 패키지 설치 및 로케일 설정
RUN apt-get update && apt-get install -y locales && \
    sed -i '/ko_KR.UTF-8/s/^# //' /etc/locale.gen && \
    locale-gen ko_KR.UTF-8 && \
    dpkg-reconfigure --frontend=noninteractive locales && \
    apt-get clean

# 로케일 환경 변수 설정
ENV LANG=ko_KR.UTF-8
ENV LANGUAGE=ko_KR.UTF-8
ENV LC_ALL=ko_KR.UTF-8

# 작업 디렉토리 설정
WORKDIR /app

# 필요한 파일 복사
COPY . .

# 의존성 설치
RUN pip install --no-cache-dir -r requirements.txt

# Flask 환경변수 설정
ENV FLASK_APP=app.py
ENV FLASK_ENV=development

# 5000번 포트 노출
EXPOSE 5000

# 컨테이너 실행 시 Flask 실행
CMD ["python", "app.py"]
