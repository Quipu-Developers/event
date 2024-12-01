import axios from "axios";
import { ApiResponse } from "@/types/user_info";

const BASE_URL = process.env.REACT_APP_BACKEND_URL;
const FRONTEND_URL = process.env.REACT_APP_FRONTEND_URL;

export const getStores = async (
    setStores: React.Dispatch<React.SetStateAction<any[]>>,
    setError: React.Dispatch<React.SetStateAction<string | null>>,
    setLoading: React.Dispatch<React.SetStateAction<boolean>>
) => {
    try {
        const token = localStorage.getItem("jwtToken");

        const response = await axios.get<ApiResponse>(`${BASE_URL}/all-store`, {
            headers: {
                Accept: "application/json",
                Origin: FRONTEND_URL,
                Authorization: token ? `Bearer ${token}` : "",
            },
        });

        if (response.data.status === 'success') {
            setStores(response.data.data.store_list);
        } else {
            setError('데이터를 불러오는데 실패했습니다.');
        }
    } catch (err: any) {
        setError('네트워크 오류');
    } finally {
        setLoading(false);
    }
};
