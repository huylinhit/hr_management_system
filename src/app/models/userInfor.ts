import { StaffSkill } from "./staffSkill";

export interface UserInfor {
  staffId: number;
  id: number;
  lastName: string;
  firstName: string;
  fullName: string;
  email: string;
  position: string;
  departmentName: string;
  dob: string;
  phone: string;
  gender: boolean;
  gioiTinh: string;
  address: string;
  country: string;
  citizenId: string;
  departmentId: number;
  isManager: boolean;
  hireDate: string;
  bankAccount: string;
  bankAccountName: string;
  bank: string;
  workTimeByYear: number;
  accountStatus: boolean;
  staffSkills: StaffSkill[];
}
