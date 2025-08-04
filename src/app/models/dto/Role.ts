export interface Role{
    code: string;
    level: number;
    canAdminItself: boolean;
    deleted: boolean;
    createdBy: number;
    createdAt: Date;
    modifiedBy: number;
    modifiedAt: Date;
    deletedBy: number;
    deletedAt: Date;
}