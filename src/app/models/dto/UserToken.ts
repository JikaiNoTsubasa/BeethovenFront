export interface UserToken{
    id: number;
    access: string;
    refresh: string;
    generatedAt: Date;
    accessExpiresAt: Date;
    refreshExpiresAt: Date;
    userId: number;
}