import "@/styles/Search.css"
import React, { useEffect, useState, useCallback } from 'react';
import { TbSnowflake } from "react-icons/tb";
import { TbReload } from "react-icons/tb";
import { FaSearch } from "react-icons/fa";
import { IoIosArrowRoundBack } from "react-icons/io";
import {getStores} from "@/services/get_store"
import {useHandlePath} from "@/hooks/handlePath";


//GET /all-store

export default function Search() {
    const handlePath = useHandlePath();
    const [stores, setStores] = useState<UserInfo[]>([]);  // 가게 목록 저장 상태
    const [loading, setLoading] = useState<boolean>(true); // 로딩 상태
    const [error, setError] = useState<string | null>(null);    // 에러 상태
    const [maxUserID, setMaxUserID] = useState<number | null>(null);
    const [randomNumbers, setRandomNumbers] = useState<number[]>([]);
    const [storeNames, setStoreNames] = useState<string[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalList, setModalList] = useState<string[]>([]);
    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    //api 요청
    useEffect(() => {
        getStores(setStores, setError, setLoading);
    }, []);

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
            setMaxUserID(maxID);
        }
    }, [stores]);

    // 랜덤 숫자 생성 함수 (useCallback으로 메모이제이션)
    const getRandomNumbers = useCallback(() => {
        const numbers: Set<number> = new Set();
        while (numbers.size < 4) {
            const randomNum = Math.floor(Math.random() * maxUserID!) + 1;
            numbers.add(randomNum);
        }
        return Array.from(numbers);
    }, [maxUserID]);

// maxUserID가 설정되면 랜덤 번호를 생성
    useEffect(() => {
        if (maxUserID! >= 4) {
            setRandomNumbers(getRandomNumbers());
        } else {
            // maxUserID가 4 미만일 때, 1부터 maxUserID까지 생성
            const numbers = Array.from({ length: maxUserID! }, (_, index) => index + 1);
            setRandomNumbers(numbers);
        }
    }, [maxUserID,getRandomNumbers]);


    //랜덤 번호 생성

    //랜덤 번호로 추천 목록 갱신
    useEffect(() => {
        const getUserNameByID = (userID: number) => {
            const store: UserInfo | undefined = stores.find((store) => store.userID === userID);
            return store ? `${store.username}님의 붕어빵 가게` : "불러오지 못했습니다.";
        };
        if (maxUserID != null && maxUserID >= 4) {
            const names = randomNumbers.map((userID) => getUserNameByID(userID));
            const formattedUsernames = stores.map((store) => `${store.username}님의 붕어빵 가게`);
            setStoreNames(names);
            setModalList(formattedUsernames);
        }
    }, [randomNumbers, stores, maxUserID]);


    return (
        <div className="search-container">
            <div className="back">
                <IoIosArrowRoundBack onClick={() => handlePath('/main')}/>
            </div>
            <div className="search-top">
                <TbSnowflake/>
                <h1>친구 가게 조회하기</h1>
            </div>
            <div className="button-setup">
                <div
                    className="random-recommend"
                    onClick={() => {
                        if (maxUserID! >= 4) {
                            setRandomNumbers(getRandomNumbers());
                        }
                    }}
                >
                    <h4>랜덤 추천 </h4>
                    <TbReload/>
                </div>
                {storeNames.map((storeName, index) => (
                    <button key={index} onClick={() => console.log(randomNumbers[index])}>
                    {storeName}
                    </button>
                ))}
            </div>
            <div className="search-all-store">
                <button onClick={openModal}>모든 가게 <FaSearch/></button>
                {isModalOpen && (
                    <div className="modal-overlay">
                        <div className="modal-container">
                            <TbSnowflake />
                            <h2>모든 가게 목록</h2>
                            <ul>
                                {modalList.map((item, index) => (
                                    <li
                                        key={index}
                                        onClick={() => console.log(index + 1)}
                                        style={{cursor: 'pointer'}}
                                    >
                                        {item}
                                    </li>
                                ))}
                            </ul>
                            <button onClick={closeModal}>닫기</button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
