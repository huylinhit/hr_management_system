import { LeaveType } from "./leaveType";
import { Staff } from "./staff";

export interface LogLeave {
  leaveLogId: number
  staffId: number
  leaveTypeId: number
  leaveStart: string
  leaveEnd: string
  leaveDays: number
  leaveHours: number
  salaryPerDay: number
  amount: number
  description: string
  status: string
  createAt: string
  processNote: string
  respondencesId: number
  changeStatusTime: string
  enable: boolean
  leaveType: LeaveType
  staff: Staff
}
