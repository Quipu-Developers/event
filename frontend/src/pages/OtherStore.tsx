import "@/styles/OtherStore.css";
import {TbSnowflake} from "react-icons/tb";
import {IoIosArrowRoundBack} from "react-icons/io";
import Store from "@/components/Store/Store"
import React, {useEffect, useState} from "react";
import {FaSearch} from "react-icons/fa";
export default function Start() {
    const [storeData] = useState({
        data: {
            loginUser: "예나",
            username: "예나",
            choiceType: "fish2",
            coin: 1500,
            memoChoiceCount: {
                fish1: 2, //팥붕
                fish2: 2, //슈붕
                fish3: 3, //민초붕
                fish4: 2, //고구마붕
            },
        },
    });

    const [selectedFish, setSelectedFish] = useState("");

    useEffect(() => {
        console.log(selectedFish); //선택한 붕어빵 종류 출력
    });

    return (
        <div className="otherstore-container" style={{background: "#FFFBED"}}>
            <div className="back">
                <IoIosArrowRoundBack/>
            </div>
            <div className="otherstore-top">
                <TbSnowflake/>
                <h1>{storeData.data.username}님의 붕어빵 가게</h1>
            </div>
            <div className="store-container">
                <Store
                    username={storeData.data.username}
                    memoChoiceCount={storeData.data.memoChoiceCount}
                    setSelectedFish={setSelectedFish}
                />
            </div>
            <button >모든 가게 <FaSearch/></button>
        </div>
    );
}
