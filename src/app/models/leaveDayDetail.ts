import { LeaveType } from "./leaveType";
import { Staff } from "./staff";

export interface LeaveDayDetail {
  leaveDayDetailId: number;
  staffId: number;
  leaveTypeId: number;
  dayLeft: number;
  changeAt: Date;
  leaveType: LeaveType;
  staff: Staff;
}
