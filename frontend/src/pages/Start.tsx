import "@/styles/Start.css";
import { useHandlePath } from "@/hooks/handlePath";
import fishUrl1 from "@/assets/슈붕.png";
import fishUrl2 from "@/assets/팥붕.png";

export default function Start() {
  const handlePath = useHandlePath();

  return (
    <div className="start-container">
      <h1>
        퀴여운<br></br>붕어빵 가게
      </h1>
      <div className="start-button-box">
        <button onClick={() => handlePath("/test")}>
          <img src={fishUrl1} alt="붕어" />내 붕어빵 가게 조회하기
        </button>
        <button onClick={() => handlePath("/login")}>
          <img src={fishUrl2} alt="붕어" />
          친구 가게 조회하기
        </button>
      </div>
    </div>
  );
}
