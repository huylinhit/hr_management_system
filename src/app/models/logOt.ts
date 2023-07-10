import { OtType } from "./otType"
import { Staff } from "./staff"

export interface LogOt {
  otLogId: number
  staffId: number
  otTypeId: number
  logStart: string
  logEnd: string
  logHours: number
  days: number
  salaryPerDay: number
  amount: number
  reason: string
  status: string
  processNote: string
  respondencesId: number
  createAt: string
  changeStatusTime: string
  enable: boolean
  otType: OtType
  staff: Staff
}
