import { Entity } from "./Entity";
import { User } from "./User";

export interface Teams extends Entity{
    members: User[];
}