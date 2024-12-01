export interface Store {
    type: string;
    userID: number;
    username: string;
}
export interface ApiResponse{
    data: {
        store_list: Store[];
    }
    status: string;
}


/*
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
 */

