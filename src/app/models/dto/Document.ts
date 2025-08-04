export interface Document{
    isDeleted: boolean;
    createdBy: number;
    createdAt: Date;
    modifiedBy: number;
    modifiedAt: Date;
    deletedBy: number;
    deletedAt: Date;
    id: number;
    name: string;
    path: string;
    versionId: number;
    version: string;
    entityId: number;
    entityName: string;
}