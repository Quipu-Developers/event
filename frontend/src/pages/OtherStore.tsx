import "@/styles/OtherStore.css";
import {TbSnowflake} from "react-icons/tb";
import {IoIosArrowRoundBack} from "react-icons/io";
import Store from "@/components/Store/Store"
import React, {useEffect, useState} from "react";
import 팥붕 from "@/assets/팥붕.png";
import 슈붕 from "@/assets/슈붕.png";
import 민초붕 from "@/assets/민초붕.png";
import 고구마붕 from "@/assets/고구마붕.png";
import '@iconify/react';
import { Icon } from "@iconify/react";

type FishType = "팥붕" | "슈붕" | "민초붕" | "고구마붕";
const fishImages : Record<FishType, string> = {
    팥붕: 팥붕,
    슈붕: 슈붕,
    민초붕: 민초붕,
    고구마붕: 고구마붕,
};

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
    const [myFish, setMyFish] = useState<FishType>("팥붕")

    useEffect(() => {
        console.log(selectedFish); //선택한 붕어빵 종류 출력
    }, [selectedFish]);

    useEffect(()=>{
        switch (storeData.data.choiceType) {
            case "fish2":
                setMyFish("슈붕")
                break;
            case "fish3":
                setMyFish("민초붕")
                break;
            case "fish4":
                setMyFish("고구마붕")
                break;
            default:
                setMyFish("팥붕")
                break;
        }
    }, [storeData.data.choiceType]);

    return (
        <div className="otherstore-container">
            <div className="back">
                <IoIosArrowRoundBack/>
            </div>
            <div className="otherstore-top">
                <TbSnowflake/>
                <h1>{storeData.data.username}님의 붕어빵 가게</h1>
            </div>
            <div className="store-container">
                <img src={fishImages[myFish]} alt="붕어빵 이미지" className="my-fish-image"/>
                <Store
                    username={storeData.data.username}
                    memoChoiceCount={storeData.data.memoChoiceCount}
                    setSelectedFish={setSelectedFish}
                />
                <div className="coin-box">
                    <Icon icon="mingcute:currency-won-line" />
                    <h4>{storeData.data.coin}</h4>
                </div>

            </div>
            <div className="otherstore-button">
                <button>붕어빵 만들어주기</button>
            </div>

        </div>
    );
}
