CREATE DATABASE IF NOT EXISTS mywork;
USE mywork;

-- Quipu 회원 데이터베이스 테이블 생성 및 초기 데이터 삽입
CREATE TABLE IF NOT EXISTS quipu_students (
  id INT AUTO_INCREMENT PRIMARY KEY,
  studentID VARCHAR(255) NOT NULL UNIQUE
);

INSERT INTO quipu_students (studentID) 
VALUES 
  ('1111111111'),
  ('2222222222'),
  ('3333333333'),
  ('4444444444'),
  ('5555555555');
  ('6666666666');
  ('7777777777');
  ('8888888888');
  ('9999999999');

-- Users 테이블 생성
CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(50) NOT NULL,
  studentID VARCHAR(20) NOT NULL UNIQUE,
  password_hash VARCHAR(255) NOT NULL,
  nickname VARCHAR(50) NOT NULL,
  choiceType VARCHAR(50) NOT NULL,
  topic VARCHAR(255) DEFAULT NULL,
  coin INT DEFAULT 0
);

-- Messages 테이블 생성
CREATE TABLE IF NOT EXISTS messages (
  memo_id INT AUTO_INCREMENT PRIMARY KEY,
  content TEXT NOT NULL,
  sender INT NOT NULL,
  receiver VARCHAR(50) NOT NULL,
  choiceType VARCHAR(50) NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (sender) REFERENCES users (id) ON DELETE CASCADE ON UPDATE CASCADE
);

-- Users 테이블에 초기 데이터 삽입 (메시지 작성 수에 따라 초기 코인 설정)
INSERT INTO users (username, studentID, password_hash, nickname, choiceType, topic, coin)
VALUES 
  ('이예나', '1111111111', 'scrypt:32768:8:1$SyMhaaCZRlRwGFwq$bcf42b886f05eec9eed67824965be51b1b30ba14147821a32c2e890181de6d5235a32ec25764ffc6046d94fa58861cebda11926519a520322829086fd25e5c05', '예나붕', 'fish2', '토픽1 어쩌고 저쩌고', 1500), -- 비밀번호 1111
  ('이제민', '2222222222', 'scrypt:32768:8:1$DIKPiBNYDEZIYTXE$e3ff9d5a379f8705a13093a80f05020bc539a5eec2d31ffab93900bc93ba1f6210ee6b920bdab7b50e6ee898a4517dddeb93afcd12b32759764dd1e14661a0a5', '제민붕', 'fish3', NULL, 1500), -- 비밀번호 2222
  ('김예영', '3333333333', 'scrypt:32768:8:1$SPRmOKut7V9r6E39$0c89843a8d2b3e133dbadd80ed188cfcb3307243159249e589b610a4024ecaf136ab016d5f65fc81f762b9c11e474116e7767624da8f17e5cd238e99bef23226', '예영붕', 'fish1', '토픽2 어쩌고 저쩌고', 1500), -- 비밀번호 3333
  ('차준섭', '4444444444', 'scrypt:32768:8:1$3dcFpI3okadJvU9c$f109ccf90a27490c648122dd9731be2183d1edddf5247b75b957dd699895a9e88068a2ac2bff81161235f07983ca0e0f06ce0cffb81c5b7e2affefffe4219e95', '준섭붕', 'fish4', '토픽3 어쩌고 저쩌고', 1500), -- 비밀번호 4444
  ('정민욱', '5555555555', 'scrypt:32768:8:1$9zx1Tc0u5G8fAOug$8099fc03630d17c71b56aa6cce2781e557e907270cbd1045241f753dd40078ac5ec4fe6fc27002dab54568e6086ab859d0f57ed55ce4f0e76bf1e21dd2b9fc18', '민욱붕', 'fish1', NULL, 1500); -- 비밀번호 5555

-- Messages 테이블에 초기 데이터 삽입
INSERT INTO messages (content, sender, receiver, choiceType)
VALUES 
  ('이예나가 이제민 가게에 남긴 메시지.', 1, 2, 'fish1'),
  ('이제민이 김예영 가게에 남긴 메시지.', 2, 3, 'fish1'),
  ('김예영이 차준섭 가게에 남긴 메시지.', 3, 4, 'fish2'),
  ('차준섭이 정민욱 가게에 남긴 메시지.', 4, 5, 'fish4'),
  ('정민욱이 이예나 가게에 남긴 메시지.', 5, 1, 'fish3'),
  ('이제민이 이예나 가게에 남긴 메시지.', 2, 1, 'fish3'),
  ('김예영이 이제민 가게에 남긴 메시지.', 3, 2, 'fish1'),
  ('차준섭이 김예영 가게에 남긴 메시지.', 4, 3, 'fish2'),
  ('정민욱이 차준섭 가게에 남긴 메시지.', 5, 4, 'fish4'),
  ('이예나가 정민욱 가게에 남긴 메시지.', 1, 5, 'fish2'),
  ('김예영이 정민욱 가게에 남긴 메시지.', 3, 5, 'fish4'),
  ('정민욱이 김예영 가게에 남긴 메시지.', 5, 3, 'fish3'),
  ('이제민이 차준섭 가게에 남긴 메시지.', 2, 4, 'fish1'),
  ('차준섭이 이예나 가게에 남긴 메시지.', 4, 1, 'fish4'),
  ('이예나가 김예영 가게에 남긴 메시지.', 1, 3, 'fish1');
