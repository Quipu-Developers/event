import styles from "./Store.module.css";
import fish1 from "@/assets/팥붕.png";
import fish2 from "@/assets/슈붕.png";
import fish3 from "@/assets/민초붕.png";
import fish4 from "@/assets/고구마붕.png";

export default function Store({
  username,
  memoChoiceCount,
  setSelectedFish,
}: StoreProps) {
  const fishBreadImages: { [key in keyof typeof memoChoiceCount]: string } = {
    fish1: fish1,
    fish2: fish2,
    fish3: fish3,
    fish4: fish4,
  };

  const fishList: Array<keyof typeof memoChoiceCount | null> = [];
  Object.entries(memoChoiceCount).forEach(([type, count]) => {
    for (let i = 0; i < count; i++) {
      fishList.push(type as keyof typeof memoChoiceCount);
    }
  });

  while (fishList.length < 9) {
    fishList.push(null);
  }

  const shuffledFishList = fishList.sort(() => Math.random() - 0.5);

  const handleFish = (type: string) => {
    setSelectedFish(type);
  };

  return (
    <div className={styles.storeContainer}>
      <div className={styles.storeName}>
        <h2>{username}네 붕어빵</h2>
        <h3>{username}네 붕어빵</h3>
      </div>
      <div className={styles.storeRoofTop}></div>
      <div className={styles.storeRoofBottom}>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
      <div className={styles.storeFront}>
        <div className={styles.fishBreadContainer}></div>
        <div className={styles.fishBreadBox}>
          {shuffledFishList.map((type, index) => (
            <div className={styles.fishBreadImage} key={index}>
              {type && (
                <img
                  src={fishBreadImages[type]}
                  alt={`${type}-bread-${index}`}
                  className={styles.fishBreadImage}
                  onClick={() => handleFish(type)}
                />
              )}
            </div>
          ))}
        </div>
        <div className={styles.fishBreadCost}>
          <div>
            <p>팥붕 슈붕</p>
            <p>민초붕 고구마붕</p>
          </div>
          <div>
            <p>3마리</p>
            <p>1500원</p>
          </div>
        </div>
      </div>
      <div className={styles.storeBack}></div>
    </div>
  );
}
