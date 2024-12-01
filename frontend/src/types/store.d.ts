declare interface StoreProps {
  username: string;
  memoChoiceCount: {
    fish1: number;
    fish2: number;
    fish3: number;
    fish4: number;
  };
  setSelectedFish: React.Dispatch<React.SetStateAction<T>>;
}
