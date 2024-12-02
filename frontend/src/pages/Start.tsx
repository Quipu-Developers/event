import { useEffect, useState } from "react";
import styles from "@/styles/Start.module.css";
import { useHandlePath } from "@/hooks/handlePath";
import fishUrl1 from "@/assets/슈붕.png";
import fishUrl2 from "@/assets/팥붕.png";
import snow from "@/assets/snow1.png";

export default function Start() {
  const handlePath = useHandlePath();
  const [maxSnowflakes, setMaxSnowflakes] = useState(20);

  useEffect(() => {
    const container = document.querySelector(`.${styles.startContainer}`);

    const images = container?.querySelectorAll("img");
    images?.forEach((image) => {
      const randomDelay = Math.random();
      image.style.setProperty("--random-delay", randomDelay.toString());
    });

    const updateMaxSnowflakes = () => {
      const containerWidth = container?.clientWidth || 600;
      const newMax = Math.floor(containerWidth / 30);
      setMaxSnowflakes(newMax);
    };

    const createSnowflakes = () => {
      if (!container) return;

      const existingSnowflakes = container.querySelectorAll(
        `.${styles.snowflake}`
      );

      if (existingSnowflakes.length >= maxSnowflakes) return;

      const snowflake = document.createElement("div");
      snowflake.className = styles.snowflake;

      snowflake.style.left = `${Math.random() * 100}%`;
      snowflake.style.animationDuration = `${Math.random() * 3 + 2}s`;
      snowflake.style.width = Math.random() > 0.5 ? "13px" : "10px";
      snowflake.style.height = snowflake.style.width;

      const randomDelay = Math.random();
      snowflake.style.setProperty("--random-delay", randomDelay.toString());

      container.appendChild(snowflake);

      snowflake.addEventListener("animationend", () => {
        snowflake.remove();
      });
    };

    const manageSnowflakes = () => {
      if (!container) return;

      const existingSnowflakes = container.querySelectorAll(
        `.${styles.snowflake}`
      );

      if (existingSnowflakes.length > maxSnowflakes) {
        Array.from(existingSnowflakes)
          .slice(0, existingSnowflakes.length - maxSnowflakes)
          .forEach((snowflake) => snowflake.remove());
      }

      for (let i = 0; i < maxSnowflakes - existingSnowflakes.length; i++) {
        createSnowflakes();
      }
    };

    updateMaxSnowflakes();
    manageSnowflakes();
    const interval = setInterval(manageSnowflakes, 500);
    window.addEventListener("resize", updateMaxSnowflakes);

    return () => {
      clearInterval(interval);
      window.removeEventListener("resize", updateMaxSnowflakes);
    };
  }, [maxSnowflakes]);

  return (
    <div className={styles.startContainer}>
      <img src={fishUrl1} alt="붕어" />
      <img src={fishUrl1} alt="붕어" />
      <img src={fishUrl2} alt="붕어" />
      <img src={fishUrl2} alt="붕어" />
      <img src={snow} alt="눈" />
      <img src={snow} alt="눈" />
      <img src={snow} alt="눈" />
      <img src={snow} alt="눈" />
      <img src={snow} alt="눈" />
      <div className={styles.startTitleBox}>
        <h1>
          퀴여운
          <br />
          붕어빵 가게
        </h1>
        <h2>
          퀴여운
          <br />
          붕어빵 가게
        </h2>
      </div>
      <div className={styles.startButtonBox}>
        <button onClick={() => handlePath("/test")}>
          <img src={fishUrl1} alt="붕어" />내 붕어빵 가게 조회하기
        </button>
        <button onClick={() => handlePath("/search")}>
          <img src={fishUrl2} alt="붕어" />
          친구 가게 조회하기
        </button>
      </div>
    </div>
  );
}
