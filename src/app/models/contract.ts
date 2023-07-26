import { Allowance } from "./allowance"
import { ContractType } from "./contractType"
import { UserInfor } from "./userInfor"

export default interface Contract {
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
	contractFile: string
	createAt: any
	responseId: any
	changeAt: any
	contractStatus: boolean
	allowances: Allowance[]
	contractType: ContractType
	staff: UserInfor
}


export interface ContractParams{
	searchTerm?: string,
	departments: string[],
	pageNumber: number,
	pageSize: number
  }
  
  
