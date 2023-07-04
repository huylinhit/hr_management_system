export interface Ticket{
    ticketId: number;
    staffId: number;
    ticketTypeId: number;
    ticketName: string;
    staffName: string;
    ticketReason: string;
    ticketFile: string;
    ticketStatus: string;
    createAt: Date;
    processNote: string;
    respondencesId: number;
    responsdenceName: string;
    changeStatusTime: Date;
    enable: boolean;
}