import "@/styles/Search.css"
import React, { useEffect, useState } from 'react';
import { TbSnowflake } from "react-icons/tb";
import { TbReload } from "react-icons/tb";
import { FaSearch } from "react-icons/fa";
import {Store, ApiResponse} from "@/types/store";
import {getStores} from "@/services/get_store"

//GET /all-store

export default function Search() {
    const [stores, setStores] = useState<Store[]>([]);  // 가게 목록 저장 상태
    const [loading, setLoading] = useState<boolean>(true); // 로딩 상태
    const [error, setError] = useState<string | null>(null);    // 에러 상태
    const [clicked, setClicked] = useState(false);
    const [maxUserID, setMaxUserID] = useState<number | null>(null);
    const [randomNumbers, setRandomNumbers] = useState<number[]>([]);
    const [storeNames, setStoreNames] = useState<string[]>([]);
    useEffect(() => {
        getStores(setStores, setError, setLoading);
    }, []); // 컴포넌트 마운트 시 한 번만 실행

    if (loading) {
        console.log('로딩중')
    }

    // 에러가 있을 경우 에러 메시지 표시
    if (error) {
        console.log(`에러: ${error}`);
    }

    useEffect(() => {
        if (stores.length > 0) {
            const maxID = Math.max(...stores.map(store => store.userID));
            setMaxUserID(maxID); // 최댓값을 상태에 저장
        }
    }, [stores]);

    useEffect(() => {
        if (maxUserID !== null) {
            const getRandomNumbers = () => {
                const numbers: Set<number> = new Set(); // 중복을 방지하기 위해 Set 사용

                while (numbers.size < 4) {
                    const randomNum = Math.floor(Math.random() * maxUserID) + 1; // 1부터 maxUserID까지 랜덤 숫자 생성
                    numbers.add(randomNum); // Set에 추가 (중복 자동 제거)
                }

                return Array.from(numbers); // Set을 배열로 변환
            };

            setRandomNumbers(getRandomNumbers()); // 랜덤 숫자 배열을 상태에 저장
        }
    }, [maxUserID]); // maxUserID가 변경될 때마다 실행


    const getUserNameByID = (userID: number) => {
        const store: Store | undefined = stores.find((store) => store.userID === userID);
        if (store) {
            return `${store.username.slice(-2)}님의 붕어빵 가게`
        }
        else {
            return "불러오지 못했습니다."
        }
    };

    useEffect(() => {
        // randomNumbers 배열에 4개 숫자가 있을 때만 실행
        if (randomNumbers.length === 4) {
            const names = randomNumbers.map((userID) => getUserNameByID(userID));
            setStoreNames(names); // storeNames 상태에 결과 저장
        }
    }, [randomNumbers]); // randomNumbers 배열이 변경될 때마다 실행


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
                <button> {storeNames[0]}</button>
                <button> {storeNames[1]}</button>
                <button> {storeNames[2]}</button>
                <button> {storeNames[3]}</button>
            </div>
            <div className="input-container">
                <input type="text" placeholder="가게 검색" />
                <FaSearch/>
            </div>
        </div>
    );
}

//Todo: axios로 api 연결.