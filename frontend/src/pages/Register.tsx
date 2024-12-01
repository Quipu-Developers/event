import React from "react";
import "@/styles/Register.css";
import mapSnow from "@/assets/map_snow.png";
import 팥붕 from "@/assets/팥붕.png";
import 슈붕 from "@/assets/슈붕.png";
import 민초붕 from "@/assets/민초붕.png";
import 고구마붕 from "@/assets/고구마붕.png";

export default function Register() {
    return (
        <div className="register-container">
            <img src={mapSnow} alt="지도 아이콘" className="map-snow" />
            <h1 className="register-title">내 붕어빵 가게 만들기</h1>

            <div className="input-container">
                <div className="input-box">
                    <input type="text" id="name" className="input-field" placeholder={"이름을 입력하세요."}/>
                </div>
                <div className="input-box">
                    <input type="text" id="student-id" className="input-field" placeholder={"학번을 입력하세요."}/>
                    <button className="check-button">확인</button>
                </div>
                <div className="input-box">
                    <input type="password" id="password" className="input-field" placeholder={"비밀번호를 설정하세요."}/>
                </div>
                <div className="input-box">
                    <input type="password" id="confirm-password" className="input-field" placeholder={"다시 한번 입력하세요."}/>
                </div>
            </div>

            <h2 className="section-title">붕어빵을 선택하세요.</h2>
            <div className="fish-selection">
                <div className="fish-item">
                    <img src={팥붕} alt="팥붕" />
                    <p className="fish-label">팥붕</p>
                </div>
                <div className="fish-item">
                    <img src={슈붕} alt="슈붕" />
                    <p className="fish-label">슈붕</p>
                </div>
                <div className="fish-item">
                    <img src={민초붕} alt="민초붕" />
                    <p className="fish-label">민초붕</p>
                </div>
                <div className="fish-item">
                    <img src={고구마붕} alt="고구마붕" />
                    <p className="fish-label">고구마붕</p>
                </div>
            </div>

            <h2 className="section-title">쪽지 받고 싶은 주제를 설정하세요. (선택)</h2>
            <div className="note-box">
                <input type="text" placeholder="예) 두산 팬들만 쪽지 주세요!" className="note-input" />
            </div>

            <button className="create-button">붕어빵 가게 생성</button>
        </div>
    );
}
