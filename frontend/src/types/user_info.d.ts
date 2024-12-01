declare global{
    interface UserInfo {
        type: string;
        userID: number;
        name: string;
    }
    interface ApiResponse{
        data: {
            UserInfo_list: UserInfo[];
        };
        status: string;
    }
}

