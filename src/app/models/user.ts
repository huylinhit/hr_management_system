import { UserInfor } from "./userInfor";

export interface User{
    email: string;
    token: string;
    userInfor: UserInfor;
    roles?: string[]
}