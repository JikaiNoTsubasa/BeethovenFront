import { User } from "./User";

export interface Message{
    id: number;
    text: string;
    createdAt: Date;
    sourceUser: User;
    targetUser: User;
    isRead: boolean;
}