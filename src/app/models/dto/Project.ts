export interface Project{
    id: number;
    name: string;
    ownerId: number;
    ownerName: string;
    isDeleted: boolean;
    createdBy: number;
    createdAt: Date;
    modifiedBy: number;
    modifiedAt: Date;
    deletedBy: number;
    deletedAt: Date;
}