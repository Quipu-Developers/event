declare interface UserInfo {
    type: string;
    userID: number;
    username: string;
}


declare interface ApiResponse{
    data: {
        store_list: UserInfo[];
    }
    status: string;
}



