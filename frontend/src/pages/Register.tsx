import React from "react";
import styles from "@/styles/Register.module.css"; // CSS 모듈 가져오기
import mapSnow from "@/assets/map_snow.png";
import 팥붕 from "@/assets/팥붕.png";
import 슈붕 from "@/assets/슈붕.png";
import 민초붕 from "@/assets/민초붕.png";
import 고구마붕 from "@/assets/고구마붕.png";

export default function Register() {
    return (
        <div className={styles.registerContainer}>
            <img src={mapSnow} alt="지도 아이콘" className={styles.mapSnow} />
            <h1 className={styles.registerTitle}>내 붕어빵 가게 만들기</h1>

            <div className={styles.inputContainer}>
                <div className={styles.inputBox}>
                    <input type="text" id="name" className={styles.inputField} placeholder="이름을 입력하세요." />
                </div>
                <div className={styles.inputBox}>
                    <input type="text" id="student-id" className={styles.inputField} placeholder="학번을 입력하세요." />
                    <button className={styles.checkButton}>확인</button>
                </div>
                <div className={styles.inputBox}>
                    <input type="password" id="password" className={styles.inputField} placeholder="비밀번호를 설정하세요." />
                </div>
                <div className={styles.inputBox}>
                    <input type="password" id="confirm-password" className={styles.inputField} placeholder="다시 한번 입력하세요." />
                </div>
            </div>

            <h2 className={styles.sectionTitle}>붕어빵을 선택하세요.</h2>
            <div className={styles.fishSelection}>
                <div className={styles.fishItem}>
                    <img src={팥붕} alt="팥붕" />
                    <p className={styles.fishLabel}>팥붕</p>
                </div>
                <div className={styles.fishItem}>
                    <img src={슈붕} alt="슈붕" />
                    <p className={styles.fishLabel}>슈붕</p>
                </div>
                <div className={styles.fishItem}>
                    <img src={민초붕} alt="민초붕" />
                    <p className={styles.fishLabel}>민초붕</p>
                </div>
                <div className={styles.fishItem}>
                    <img src={고구마붕} alt="고구마붕" />
                    <p className={styles.fishLabel}>고구마붕</p>
                </div>
            </div>

            <h2 className={styles.sectionTitle}>쪽지 받고 싶은 주제를 설정하세요. (선택)</h2>
            <div className={styles.noteBox}>
                <input type="text" placeholder="예) 두산 팬들만 쪽지 주세요!" className={styles.noteInput} />
            </div>

            <button className={styles.createButton}>붕어빵 가게 생성</button>
        </div>
    );
}
