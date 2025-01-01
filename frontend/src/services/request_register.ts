import axios from "axios";

const backendUrl = process.env.REACT_APP_BACKEND_URL;

// API 클라이언트 생성
const apiClient = axios.create({
    baseURL: backendUrl, // 백엔드 API 기본 URL
    headers: {
        "Content-Type": "application/json",
    },
});

// 사용자 데이터 인터페이스 정의
export interface RegisterUserData {
    name: string;
    studentID: string;
    password: string;
    choiceType: string;
    topic?: string; // 선택적 필드
}

// 서버 응답 데이터 인터페이스 정의 (필요 시)
export interface RegisterResponse {
    message: string; // 서버에서 반환하는 메시지 형식
}

// 회원가입 API 호출 함수
export const registerUser = async (
    userData: RegisterUserData
): Promise<RegisterResponse> => {
    try {
        const response = await apiClient.post<RegisterResponse>("/register", userData);
        return response.data; // 성공적인 응답 데이터 반환
    } catch (error: any) {
        // 에러 핸들링
        if (error.response) {
            throw new Error(error.response.data.message || "서버 오류가 발생했습니다.");
        } else {
            throw new Error("네트워크 오류가 발생했습니다.");
        }
    }
};
