export interface GlobalParameter{
    id: number;
    code: string;
    value: string;
    type: GlobalParameterType;
    group: string;
    deleted: boolean;
    createdBy: number;
    createdAt: Date;
    modifiedBy: number;
    modifiedAt: Date;
    deletedBy: number;
    deletedAt: Date;
}

export enum GlobalParameterType {
    STRING,
    NUMBER,
    LIST,
    BOOL,
}