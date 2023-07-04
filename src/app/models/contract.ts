import { Allowance } from "./allowance"
import { ContractType } from "./contractType"

export interface Contract {
    contractId: number;
    staffId: number;
    startDate: string;
    endDate: string;
	taxableSalary: number;
	salary: number;
	workDatePerWeek: number;
	note: string;
	noOfDependences: number;
	contractTypeId: number;
	salaryType: string;
	paidDateNote: string;
	contractFile: string;
	createAt: string;
	changeAt: string;
	contractStatus: number;
}