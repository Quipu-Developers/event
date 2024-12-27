import React, { useState } from "react";
import styles from "@/styles/Login.module.css"; // CSS 모듈 가져오기
import { useNavigate } from "react-router-dom"; // useNavigate 임포트
import 눈결정 from "@/assets/map_snow.png";
import 붕어 from "@/assets/붕어.png";

export default function Login() {
  const navigate = useNavigate(); // 페이지 이동 훅
  const [formData, setFormData] = useState({
    studentID: "",
    password: "",
  });
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // 입력 핸들러
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // 폼 제출 핸들러
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5001/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          studentID: formData.studentID,
          password: formData.password,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        const { token } = data;

        // JWT 토큰 저장
        localStorage.setItem("token", token);

        // 페이지 이동
        navigate("/start");
      } else if (response.status === 400) {
        const errorData = await response.json();
        setErrorMessage(
          errorData.error || "학번 또는 비밀번호가 잘못되었습니다."
        );
      } else {
        setErrorMessage("로그인에 실패했습니다. 다시 시도해주세요.");
      }
    } catch (error) {
      setErrorMessage("네트워크 오류가 발생했습니다. 다시 시도해주세요.");
    }
  };

  return (
    <div className={styles.loginContainer}>
      <img src={눈결정} alt="지도 아이콘" className={styles.mapSnow} />
      <h1 className={styles.loginTitle}>로그인</h1>
      <img src={붕어} alt="붕어 이미지" className={styles.붕어2} />

      {errorMessage && <p className={styles.errorMessage}>{errorMessage}</p>}

      <form onSubmit={handleSubmit} className={styles.inputContainer}>
        <div className={styles.inputBox}>
          <input
            type="text"
            name="studentID"
            value={formData.studentID}
            onChange={handleChange}
            className={styles.inputField}
            placeholder="학번을 입력하세요."
            required
          />
        </div>
        <div className={styles.inputBox}>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className={styles.inputField}
            placeholder="비밀번호를 입력하세요."
            required
          />
        </div>
        <button
          type="submit"
          className={`${styles.button} ${styles.loginButton}`}
        >
          로그인
        </button>
      </form>

      <button
        className={`${styles.button} ${styles.signupButton}`}
        onClick={() => navigate("/register")}
      >
        회원가입
      </button>
    </div>
  );
}
