import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { LoginResponse } from "../models/dto/LoginResponse";
import { User } from "../models/dto/User";
import { Role } from "../models/dto/Role";
import { GlobalParameter } from "../models/dto/GlobalParameter";
import { Project } from "../models/dto/Project";
import { Document } from "../models/dto/Document";

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
        return this.http.get<User>(this.getEnvUrl() + '/api/me');
    }

    fetchUsers(): Observable<User[]> {
        return this.http.get<User[]>(this.getEnvUrl() + '/api/users');
    }

    fetchUser(id: number): Observable<User> {
        return this.http.get<User>(this.getEnvUrl() + '/api/users/' + id);
    }

    fetchUserRoles(id: number): Observable<Role[]> {
        return this.http.get<Role[]>(this.getEnvUrl() + '/api/users/' + id + '/roles');
    }
    //#endregion

    //#region Global Param
    fetchGlobalParameters(): Observable<GlobalParameter[]> {
        return this.http.get<GlobalParameter[]>(this.getEnvUrl() + '/api/global-parameters');
    }

    updateGlobalParameter(code: string, value: string): Observable<GlobalParameter> {
        let data: any = {};
        data.value = value;
        data.code = code;
        return this.http.put<GlobalParameter>(this.getEnvUrl() + '/api/global-parameters/' + code + '/value', data);
    }
    //#endregion

    //#region Projects
    fetchMyProjects(): Observable<Project[]> {
        return this.http.get<Project[]>(this.getEnvUrl() + '/api/my-projects');
    }

    fetchMyProject(id: number): Observable<Project> {
        return this.http.get<Project>(this.getEnvUrl() + '/api/my-projects/' + id);
    }

    fetchProjectDocuments(id: number): Observable<Document[]> {
        return this.http.get<Document[]>(this.getEnvUrl() + '/api/projects/' + id + '/documents');
    }
    //#endregion
}