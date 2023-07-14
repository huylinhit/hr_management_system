import { Staff } from "./staff"
import { TaxDetail } from "./taxDetail"

export interface Payslip {
  payslipId: number
  staffId: number
  grossStandardSalary: number
  grossActualSalary: number
  standardWorkDays: number
  actualWorkDays: number
  leaveHours: number
  leaveDays: number
  otTotal: number
  bhxhemp: number
  bhytemp: number
  bhtnemp: number
  salaryBeforeTax: number
  selfDeduction: number
  familyDeduction: number
  taxableSalary: number
  personalIncomeTax: number
  totalAllowance: number
  salaryRecieved: number
  netStandardSalary: number
  netActualSalary: number
  bhxhcomp: number
  bhytcomp: number
  bhtncomp: number
  totalCompInsured: number
  totalCompPaid: number
  createAt: string
  changeAt: string
  creatorId: number
  changerId: number
  payday: string
  enable: boolean
  status: string
  staff: Staff
  taxDetails: TaxDetail[]
}

