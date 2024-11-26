import { useNavigate } from "react-router-dom";
import "@/styles/Start.css";

export default function Start() {
  const navigate = useNavigate();

  const gotoLogin = () => {
    navigate("/login");
  };

  const gotoSearch = () => {
    navigate("/search");
  };

  return (
    <div className="start-container">
      <h1>퀴여운</h1>
      <h1>붕어빵 가게</h1>
      <button onClick={gotoLogin}>내 붕어빵 가게 조회하기</button>
      <button onClick={gotoSearch}>친구 가게 조회하기</button>
    </div>
  );
}
