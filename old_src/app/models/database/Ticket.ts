import { Priority } from "./Priority";
import { Product } from "./Product";
import { TicketType } from "./TicketType";
import { User } from "./User";

export interface Ticket{
    id: number;
    name: string;
    description: string;
    assignedTo: User | null;
    reviewedBy: User | null;
    status: TicketStatus;
    createdAt: Date;
    updatedAt: Date;
    product: Product | null;
    gitlabTicketId: number | null;
    activities: TicketActivity[];
    type: TicketType;
    priority: Priority;
}

export interface TicketStatus{
    id: number;
    name: string;
}

export interface TicketActivity{
    id: number;
    message: string;
    createdAt: Date;
    user: User;
}