export interface Ticket{
    ticketId: number;
    staffId: number;
    ticketTypeId: number;
    ticketReason: string;
    ticketFile: string;
    ticketStatus: boolean;
    createAt: Date;
    processNote: string;
    respondencesId: number;
    changeStatusTime: Date;
    enable: boolean;
}