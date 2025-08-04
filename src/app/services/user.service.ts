import { Injectable } from "@angular/core";
import { User } from "../models/dto/User";

@Injectable({
    providedIn: "root",
})
export class UserService {
    
    currentUser: User | null = null;


}