import { AllowanceType } from "./allowanceType"

export interface Allowance {
	contractId: number
	allowanceId: number
	allowanceTypeId: number
	allowanceSalary: number
	allowanceType: AllowanceType
  }