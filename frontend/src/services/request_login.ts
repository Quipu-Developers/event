import axios from "axios";

const backendUrl = process.env.REACT_APP_BACKEND_URL;

if (!backendUrl) {
    throw new Error("REACT_APP_BACKEND_URL is not defined in .env.local");
}

// Axios 클라이언트 설정
const apiClient = axios.create({
    baseURL: backendUrl,
    headers: {
        "Content-Type": "application/json",
    },
});

// 로그인 요청 데이터 인터페이스
export interface LoginUserData {
    studentID: string;
    password: string;
}

// 로그인 응답 데이터 인터페이스
export interface LoginResponse {
    token: string; // JWT 토큰
}

// 로그인 API 호출 함수
export const loginUser = async (userData: LoginUserData): Promise<LoginResponse> => {
    try {
        const response = await apiClient.post<LoginResponse>("/login", userData);
        return response.data; // 성공적인 응답 반환
    } catch (error: any) {
        if (error.response) {
            throw new Error(error.response.data.error || "학번 또는 비밀번호가 잘못되었습니다.");
        } else {
            throw new Error("네트워크 오류가 발생했습니다.");
        }
    }
};
