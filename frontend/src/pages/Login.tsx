import React, { useState } from "react";
import styles from "@/styles/Login.module.css";
import { useNavigate } from "react-router-dom";
import 눈결정 from "@/assets/map_snow.png";
import 붕어 from "@/assets/붕어.png";
import { loginUser, LoginUserData } from "@/services/request_login";

export default function Login() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState<LoginUserData>({
        studentID: "",
        password: "",
    });
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const data = await loginUser(formData);
            const { token } = data;

            // JWT 토큰 저장
            localStorage.setItem("token", token);

            // 페이지 이동
            navigate("/main");
        } catch (error: any) {
            setErrorMessage(error.message);
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
                <button type="submit" className={`${styles.button} ${styles.loginButton}`}>
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
