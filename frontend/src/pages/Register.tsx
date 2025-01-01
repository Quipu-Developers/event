import React, { useState } from "react";
import styles from "@/styles/Register.module.css";
import mapSnow from "@/assets/map_snow.png";
import 팥붕 from "@/assets/팥붕.png";
import 슈붕 from "@/assets/슈붕.png";
import 민초붕 from "@/assets/민초붕.png";
import 고구마붕 from "@/assets/고구마붕.png";
import { registerUser } from "@/services/request_register";

export default function Register() {
    const [formData, setFormData] = useState({
        name: "",
        studentID: "",
        password: "",
        confirmPassword: "",
        choiceType: "fish1", // 기본 선택
        topic: "",
    });
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // 비밀번호 확인
        if (formData.password !== formData.confirmPassword) {
            setErrorMessage("비밀번호가 일치하지 않습니다.");
            return;
        }

        try {
            // API 호출
            await registerUser({
                name: formData.name,
                studentID: formData.studentID,
                password: formData.password,
                choiceType: formData.choiceType,
                topic: formData.topic,
            });

            setSuccessMessage("붕어빵 가게 생성이 완료되었습니다!");
            setErrorMessage(null);

            // 폼 초기화
            setFormData({
                name: "",
                studentID: "",
                password: "",
                confirmPassword: "",
                choiceType: "fish1",
                topic: "",
            });
        } catch (error: any) {
            setErrorMessage(error.message);
        }
    };

    return (
        <div className={styles.registerContainer}>
            <img src={mapSnow} alt="지도 아이콘" className={styles.mapSnow} />
            <h1 className={styles.registerTitle}>내 붕어빵 가게 만들기</h1>

            {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
            {successMessage && <p style={{ color: "green" }}>{successMessage}</p>}

            <form onSubmit={handleSubmit}>
                <div className={styles.inputContainer}>
                    <div className={styles.inputBox}>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className={styles.inputField}
                            placeholder="이름을 입력하세요."
                            required
                        />
                    </div>
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
                            placeholder="비밀번호를 설정하세요."
                            required
                        />
                    </div>
                    <div className={styles.inputBox}>
                        <input
                            type="password"
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            className={styles.inputField}
                            placeholder="다시 한번 입력하세요."
                            required
                        />
                    </div>
                </div>

                <h2 className={styles.sectionTitle}>붕어빵을 선택하세요.</h2>
                <div className={styles.fishSelection}>
                    <label className={styles.fishItem}>
                        <input
                            type="radio"
                            name="choiceType"
                            value="fish1"
                            checked={formData.choiceType === "fish1"}
                            onChange={handleChange}
                            className={styles.radioInput}
                        />
                        <img src={팥붕} alt="팥붕" className={styles.fishImage} />
                        <p className={styles.fishLabel}>팥붕</p>
                    </label>
                    <label className={styles.fishItem}>
                        <input
                            type="radio"
                            name="choiceType"
                            value="fish2"
                            checked={formData.choiceType === "fish2"}
                            onChange={handleChange}
                            className={styles.radioInput}
                        />
                        <img src={슈붕} alt="슈붕" className={styles.fishImage} />
                        <p className={styles.fishLabel}>슈붕</p>
                    </label>
                    <label className={styles.fishItem}>
                        <input
                            type="radio"
                            name="choiceType"
                            value="fish3"
                            checked={formData.choiceType === "fish3"}
                            onChange={handleChange}
                            className={styles.radioInput}
                        />
                        <img src={민초붕} alt="민초붕" className={styles.fishImage} />
                        <p className={styles.fishLabel}>민초붕</p>
                    </label>
                    <label className={styles.fishItem}>
                        <input
                            type="radio"
                            name="choiceType"
                            value="fish4"
                            checked={formData.choiceType === "fish4"}
                            onChange={handleChange}
                            className={styles.radioInput}
                        />
                        <img src={고구마붕} alt="고구마붕" className={styles.fishImage} />
                        <p className={styles.fishLabel}>고구마붕</p>
                    </label>
                </div>

                <h2 className={styles.sectionTitle}>쪽지 받고 싶은 주제를 설정하세요. (선택)</h2>
                <div className={styles.noteBox}>
                    <input
                        type="text"
                        name="topic"
                        value={formData.topic}
                        onChange={handleChange}
                        placeholder="예) 두산 팬들만 쪽지 주세요!"
                        className={styles.noteInput}
                    />
                </div>

                <button type="submit" className={styles.createButton}>
                    붕어빵 가게 생성
                </button>
            </form>
        </div>
    );
}
