export interface Contract {
	contractId: number
	staffId: number
	startDate: string
	endDate: string
	taxableSalary: number
	salary: number
	workDatePerWeek: number
	note: string
	noOfDependences: number
	contractTypeId: number
	salaryType: string
	paidDateNote: string
	contractFile: string
	contractStatus: boolean
	allowances: Allowance[]
	contractType: ContractType
	staff: Staff
  }
  
  export interface Allowance {
	contractId: number
	allowanceId: number
	allowanceTypeId: number
	allowanceSalary: number
	allowanceType: AllowanceType
  }
  
  export interface AllowanceType {
	allowanceTypeId: number
	allowanceName: string
	allowanceDetailSalary: string
  }
  
  export interface ContractType {
	contractTypeId: number
	name: string
	description: string
  }
  
  export interface Staff {
	staffId: number
	id: string
	lastName: string
	firstName: string
	fullName: string
	email: string
	position: string
	departmentName: string
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