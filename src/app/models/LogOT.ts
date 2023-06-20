export interface LogOT {
    otLogId: number;
    staffId: number;
    otTypeId: number;
    logStart: string;
    logEnd: string;
    logHours: number;
    reason: string;
    status: string;
    processNote: string;
    respondenceId: number;
    createAt: string;
    changeStatusTime: string;
    enable: boolean;
}