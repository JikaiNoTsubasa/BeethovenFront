import { Entity } from "./Entity";
import { Teams } from "./Teams";

export interface User extends Entity{
    firstname: string;
    lastname: string;
    email: string;
    avatar: string;
    teams: Teams[];
}