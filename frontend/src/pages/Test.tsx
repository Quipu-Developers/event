import { useState } from "react";
import "@/styles/Start.css";
import Store from "@/components/Store/Store";

export default function Start() {
  const [storeData] = useState({
    data: {
      loginUser: "예나",
      username: "예나",
      choiceType: "슈붕",
      coin: 1500,
      memoChoiceCount: {
        팥붕: 2,
        슈붕: 2,
        민초붕: 3,
        고구마붕: 2,
      },
    },
  });

  return (
    <div className="start-container" style={{ background: "#FFFBED" }}>
      <Store
        username={storeData.data.username}
        memoChoiceCount={storeData.data.memoChoiceCount}
      />
    </div>
  );
}
