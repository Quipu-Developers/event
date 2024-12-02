import React from "react";
import styles from "@/styles/Login.module.css"; // CSS 모듈 가져오기
import { useNavigate } from "react-router-dom"; // useNavigate 임포트
import 눈결정 from "@/assets/map_snow.png";
import 붕어 from "@/assets/붕어.png";

export default function Login() {
  const navigate = useNavigate(); // useNavigate 훅 사용
  return (
    <div className={styles.loginContainer}>
      <img src={눈결정} alt="지도 아이콘" className={styles.mapSnow} />
      <h1 className={styles.loginTitle}>로그인</h1>
      <img src={붕어} alt="붕어 이미지" className={styles.붕어2} />

      <div className={styles.inputContainer}>
        <div className={styles.inputBox}>
          <p className={styles.inputLabel}>학번을 입력하세요.</p>
        </div>
        <div className={styles.inputBox}>
          <p className={styles.inputLabel}>비밀번호를 입력하세요.</p>
        </div>
      </div>

      <button
        className={`${styles.button} ${styles.loginButton}`}
        onClick={() => navigate("/start")}
      >
        로그인
      </button>
      <button
        className={`${styles.button} ${styles.signupButton}`}
        onClick={() => navigate("/register")}
      >
        회원가입
      </button>
    </div>
  );
}
