import { UserInfor } from "./userInfor";

export interface Department {
    id: number;
    departmentId: number;
    departmentName: string;
    managerId: number;
    manager: string;
    numberOfStaff: number;
    managerPhone: string;
    managerMail: string;
    userInfors: UserInfor[];
}