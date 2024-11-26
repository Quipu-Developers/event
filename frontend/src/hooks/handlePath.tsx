import { useNavigate } from "react-router-dom";

export const useHandlePath = () => {
  const navigate = useNavigate();

  const handlePath = (path: string) => {
    navigate(path);
  };

  return handlePath;
};
