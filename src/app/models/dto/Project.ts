import { Customer } from "./Customer";

export interface Project{
    id: number;
    name: string;
    ownerId: number | null;
    ownerName: string | null;
    isDeleted: boolean;
    createdBy: number;
    createdAt: Date;
    modifiedBy: number;
    modifiedAt: Date;
    deletedBy: number;
    deletedAt: Date;
    customerId: number | null;
    customerName: string | null;
}