export interface LeaveLog {
	leaveLogId: number
	staffId: number
	leaveTypeId: number
	leaveStart: string
	leaveEnd: string
	leaveDays: number
	leaveHours: number
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
  
  export interface LeaveType {
	leaveTypeId: number
	leaveTypeName: string
	leaveTypeDetail: string
	leaveTypeMaxDay: any
  }
  
  export interface Staff {
	staffId: number
	id: string
	lastName: string
	firstName: string
	fullName: string
	email: any
	position: any
	departmentName: any
	dob: string
	phone: string
	gender: boolean
	gioiTinh: string
	address: string
	country: string
	citizenId: string
	departmentId: number
	isManager: boolean
	hireDate: string
	bankAccount: string
	bankAccountName: string
	bank: string
	workTimeByYear: number
	accountStatus: boolean
  }
  