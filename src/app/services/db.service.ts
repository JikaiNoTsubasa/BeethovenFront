import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { LoginResponse } from "../models/dto/LoginResponse";
import { User } from "../models/dto/User";
import { Role } from "../models/dto/Role";
import { GlobalParameter } from "../models/dto/GlobalParameter";

@Injectable({
    providedIn: "root",
})
export class DBService {

    constructor(private http: HttpClient) { }

    getEnvUrl(): string {
        return sessionStorage.getItem('env') ?? 'http://localhost:5088';
    }

    //#region Login
    login(login: string, password: string): Observable<LoginResponse> {
        let data: any = {};
        data.email = login;
        data.password = password;
        return this.http.post<LoginResponse>(this.getEnvUrl() + '/api/login', data);
    }
    //#endregion

    //#region Users
    fetchMyUser(): Observable<User> {
        return this.http.get<User>(this.getEnvUrl() + '/me');
    }

    fetchUsers(): Observable<User[]> {
        return this.http.get<User[]>(this.getEnvUrl() + '/users');
    }

    fetchUser(id: number): Observable<User> {
        return this.http.get<User>(this.getEnvUrl() + '/users/' + id);
    }

    fetchUserRoles(id: number): Observable<Role[]> {
        return this.http.get<Role[]>(this.getEnvUrl() + '/users/' + id + '/roles');
    }
    //#endregion

    //#region Global Param
    fetchGlobalParameters(): Observable<GlobalParameter[]> {
        return this.http.get<GlobalParameter[]>(this.getEnvUrl() + '/global-parameters');
    }

    updateGlobalParameter(code: string, value: string): Observable<GlobalParameter> {
        let data: any = {};
        data.value = value;
        data.code = code;
        return this.http.put<GlobalParameter>(this.getEnvUrl() + '/global-parameters/' + code + '/value', data);
    }
    //#endregion
}