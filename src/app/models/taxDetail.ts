import { TaxLevelNavigation } from "./taxLevelNavigation"

export interface TaxDetail {
    taxDetailId: number
    payslipId: number
    taxLevel: number
    amount: number
    taxLevelNavigation: TaxLevelNavigation
  }