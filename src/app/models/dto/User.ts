export interface User {
    id: number;
    email: string;
    canLogIn: boolean;
    identifier: string;
    firstname: string;
    lastname: string;
    lastConnectionAt: Date;
    preferedLanguageNotifications: string;
    canLogin: boolean;
    normalizedEmail: string;
    normalizedIdentifier: string;
    deleted: boolean;
    createdBy: number;
    createdAt: Date;
    modifiedBy: number;
    modifiedAt: Date;
    deletedBy: number;
    deletedAt: Date;
}