import Contract from "./contract";
import { StaffSkill } from "./staffSkill";

export interface UserInfor {
  staffId: number;
  id: string;
  imageFile: string;
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
  personnelContract: Contract;
}

export interface UserInforParams{
  searchTerm?: string,
  departments: string[],
  pageNumber: number,
  pageSize: number
}