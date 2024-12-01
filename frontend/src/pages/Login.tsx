import React from "react";
import "@/styles/Login.css";
import { useNavigate } from "react-router-dom"; // useNavigate 임포트
import 눈결정 from "@/assets/map_snow.png";
import 붕어 from "@/assets/붕어.png";

export default function Login() {
    const navigate = useNavigate(); // useNavigate 훅 사용
    return (
        <div className="login-container">
            <img src={눈결정} alt="지도 아이콘" className="map-snow" />
            <h1 className="login-title">로그인</h1>
            <img src={붕어} alt="붕어 이미지" className="붕어-2" />

            <div className="input-container">
                <div className="input-box">
                    <p className="input-label">학번을 입력하세요.</p>
                </div>
                <div className="input-box">
                    <p className="input-label">비밀번호를 입력하세요.</p>
                </div>
            </div>

            <button className="button login-button">로그인</button>
            <button className="button signup-button" onClick={() => navigate("/register")}>회원가입</button>
        </div>
    );
}
