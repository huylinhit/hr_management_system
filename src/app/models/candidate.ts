import { CandidateSkill } from "./candidateskill";

export interface Candidate {
  candidateId: number;
  imageFile: string;
  name: string;
  email: string;
  phone: string;
  dob: Date;
  departmentId: number;
  gender: boolean;
  gioiTinh: string;
  address: string;
  department: string;
  expectedSalary: number;
  resumeFile: string;
  applyDate: string;
  result: string;
  candidateSkills: CandidateSkill[];
}
