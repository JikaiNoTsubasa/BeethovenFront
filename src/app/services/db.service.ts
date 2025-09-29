import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { LoginResponse } from "../models/dto/LoginResponse";
import { User } from "../models/dto/User";
import { Role } from "../models/dto/Role";
import { GlobalParameter } from "../models/dto/GlobalParameter";
import { Project } from "../models/dto/Project";
import { Document } from "../models/dto/Document";
import { Customer } from "../models/dto/Customer";
import { ProjectPhase } from "../models/dto/ProjectPhase";
import { ProjectTask } from "../models/dto/ProjectTask";
import { ProjectPermission } from "../models/dto/ProjectPermission";

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

    fetchMyProjectPermissions(id: number): Observable<ProjectPermission[]> {
        return this.http.get<ProjectPermission[]>(this.getEnvUrl() + '/api/my-projects/' + id + '/permissions');
    }

    fetchProjectPermissions(id: number): Observable<ProjectPermission[]> {
        return this.http.get<ProjectPermission[]>(this.getEnvUrl() + '/api/projects/' + id + '/permissions');
    }

    fetchProjectDocuments(id: number): Observable<Document[]> {
        return this.http.get<Document[]>(this.getEnvUrl() + '/api/projects/' + id + '/documents');
    }

    createProject(name: string, initializePhases: boolean, customerId?: number): Observable<Project> {
        let data: any = {};
        data.name = name;
        if (customerId != null){
            data.customerId = customerId;
        }
        data.initializePhases = initializePhases;
        return this.http.post<Project>(this.getEnvUrl() + '/api/projects', data);
    }

    fetchProjectPhases(id: number): Observable<ProjectPhase[]> {
        return this.http.get<ProjectPhase[]>(this.getEnvUrl() + '/api/projects/' + id + '/phases');
    }

    fetchProjectTasks(projectId: number): Observable<ProjectTask[]> {
        return this.http.get<ProjectTask[]>(this.getEnvUrl() + '/api/projects/' + projectId + '/tasks');
    }
    //#endregion

    //#region Customer
    fetchCustomers(): Observable<Customer[]> {
        return this.http.get<Customer[]>(this.getEnvUrl() + '/api/customers');
    }
    //#endregion
}