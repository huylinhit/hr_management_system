export interface Ticket{
    ticketId: number;
    staffId: number;
    ticketTypeId: number;
    ticketReason: string;
    ticketFile: string;
    ticketStatus: string;
    createAt: string;
    processNote: string;
    respondencesId: number;
    changeStatusTime: string;
    enable: boolean;
}