import { useState, useEffect } from "react";
import Store from "@/components/Store/Store";

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
    <div
      style={{
        background: "#FFFBED",
        width: "100%",
        height: "100%",
        padding: "50px",
      }}
    >
      <Store
        username={storeData.data.username}
        memoChoiceCount={storeData.data.memoChoiceCount}
        setSelectedFish={setSelectedFish}
      />
    </div>
  );
}
