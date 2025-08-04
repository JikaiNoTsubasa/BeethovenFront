import { User } from "../User";

export interface ResponseLogin {
    accessToken: string;
    user: User;
    isLogged: boolean;
}