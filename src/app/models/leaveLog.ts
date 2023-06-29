export interface LeaveLog {
    leaveLogId: number;
	staffId: number;
	leaveTypeId: number;
	leaveStart: string;
	leaveEnd: string;
	leaveDays: number;
	leaveHours: number;
	description: string;
	status: string;
	createAt: string;
	processNote: string;
	respondencesId: number;
	changeStatusTime: string;
	enable: number;
}