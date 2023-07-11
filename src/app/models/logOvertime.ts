export interface LogOvertime {
    otLogId: number
    staffId: number
    otTypeId: number
    logStart: string
    logEnd: string
    logHours: number
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
  
  export interface OtType {
    otTypeId: number
    typeName: string
    typePercentage: number
  }
  
  export interface Staff {
    staffId: number
    imageFile: any
    lastName: string
    firstName: string
    accountStatus: boolean
  }
  