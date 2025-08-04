export interface User {
    id: number;
    email: string;
    canLogin: boolean;
    firstname: string;
    lastname: string;
    lastConnection: Date;
    avatar: string;
    isDeleted: boolean;
    createdBy: number;
    createdAt: Date;
    modifiedBy: number;
    modifiedAt: Date;
    deletedBy: number;
    deletedAt: Date;
}