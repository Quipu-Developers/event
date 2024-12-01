import "@/styles/Search.css"

import { TbSnowflake } from "react-icons/tb";
import { TbReload } from "react-icons/tb";
import { FaSearch } from "react-icons/fa";

export default function Search() {
    return (
        <div className="search-container">
            <TbSnowflake className="snow"/>
            <h1>친구 가게 조회하기</h1>
            <div className="random-recommend">
                <h4>랜덤 추천 </h4>
                <TbReload color="6D4322"/>
            </div>
            <div className="button-setup">
                <button> 붕어님의 붕어빵 가게</button>
                <button> 붕어님의 붕어빵 가게</button>
                <button> 붕어님의 붕어빵 가게</button>
                <button> 붕어님의 붕어빵 가게</button>
            </div>
            <div className="input-container">
                <label htmlFor="text-input"></label>
                <input type="text" id="text-input" placeholder="가게 검색"/>
                <FaSearch style={{
                    color: "#6D4322",          // 아이콘 색상
                    backgroundColor: "#FFF1BB", // 네모 박스 배경색
                    padding: "1.8vh",            // 네모 박스 내부 여백
                }} />
            </div>
        </div>
    );
}

// Todo: CSS 반응형으로 고치기(팀장한테 검사 맡고)
// Todo: random img에다가 onClick 기능 달기
// Todo: 아래 txt 입력 창 받기