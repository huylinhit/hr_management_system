import { Staff } from "./staff"
import { TaxDetail } from "./taxDetail"

export interface Payslip {
  payslipId: number
  staffId: number
  basicSalary: number
  actualSalary: number
  standardWorkDays: number
  actualWorkDays: number
  leaveHours: number
  leaveDays: number
  otTotal: number
  grossSalary: number
  bhxhemp: number
  bhytemp: number
  bhtnemp: number
  salaryBeforeTax: number
  selfAllowances: number
  familyAllowances: number
  salaryTaxable: number
  personalIncomeTax: number
  netSalary: number
  totalAllowance: number
  salaryRecieved: number
  paiByDate: number
  bhxhcomp: number
  bhytcomp: number
  bhtncomp: number
  totalInsured: number
  totalPaid: number
  createAt: Date
  changeAt: Date
  payslipStatus: boolean
  staff: Staff
  taxDetails: TaxDetail[]
}

