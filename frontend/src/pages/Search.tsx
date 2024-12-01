import "@/styles/Search.css"

import { TbSnowflake } from "react-icons/tb";
import { TbReload } from "react-icons/tb";
import { FaSearch } from "react-icons/fa";

export default function Search() {
    return (
        <div className="search-container">
            <div className="search-top">
                <TbSnowflake className="snow" />
                <h1>친구 가게 조회하기</h1>
            </div>
            <div className="button-setup">
                <div className="random-recommend">
                    <h4>랜덤 추천 </h4>
                    <TbReload />
                </div>
                <button> 붕어님의 붕어빵 가게</button>
                <button> 붕어님의 붕어빵 가게</button>
                <button> 붕어님의 붕어빵 가게</button>
                <button> 붕어님의 붕어빵 가게</button>
            </div>
            <div className="input-container">
                <input type="text" placeholder="가게 검색" />
                <FaSearch/>
            </div>
        </div>
    );
}

//Todo: axios로 api 연결.