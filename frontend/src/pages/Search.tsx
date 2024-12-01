import "@/styles/Search.css"
import white_snowflower from "@/assets/흰색눈꽃.png";
import random from "@/assets/랜덤추천.png"
import { TbSnowflake } from "react-icons/tb";
import { TbReload } from "react-icons/tb";

export default function Search() {
    return (
        <div className="search-container">
            <TbSnowflake className="snow"/>
            <h1>친구 가게 조회하기</h1>
            <div className="random-recommend">
                <h4>랜덤 추천 </h4>
                <TbReload color="6D4322" />

            </div>
            <div className="button-setup">
                <button> 붕어님의 붕어빵 가게</button>
                <button> 붕어님의 붕어빵 가게</button>
                <button> 붕어님의 붕어빵 가게</button>
                <button> 붕어님의 붕어빵 가게</button>
            </div>
        </div>
    );
}

// Todo: CSS 반응형으로 고치기(팀장한테 검사 맡고)
// Todo: random img에다가 onClick 기능 달기
// Todo: 아래 txt 입력 창 받기