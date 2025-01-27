import { User } from "./User";

export interface Ticket{
    id: number;
    name: string;
    description: string;
    assignedTo: User;
    reviewedBy: User;
    status: TicketStatus;
    createdAt: Date;
    updatedAt: Date;
}

export interface TicketStatus{
    id: number;
    name: string;
}