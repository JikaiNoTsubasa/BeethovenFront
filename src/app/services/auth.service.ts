import { inject, Injectable } from "@angular/core";
import { jwtDecode, JwtPayload } from "jwt-decode";
import { DBService } from "./db.service";
import { LoginResponse } from "../models/dto/LoginResponse";
import { lastValueFrom } from "rxjs";
import { Router } from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  dbService = inject(DBService);
  router = inject(Router);

  getUserFromToken() {
    const token = sessionStorage.getItem('token');
    if (!token) return null;
    try {
        const decoded = jwtDecode<JwtPayload>(token);
        return decoded;
        } catch (e) {
        console.error('Token decoding failed', e);
        return null;
        }
  }

  isLoggedIn() {
    const payload = this.getUserFromToken();
    return payload ? payload.exp ?? 0 > Date.now() / 1000 : false;
  }

  login(login: string, password: string) {
    this.dbService.login(login, password).subscribe({
      next: (response: LoginResponse) => {
        sessionStorage.setItem('token', response.accessToken);
        this.router.navigate(['/main']);
      },
      error: (error) => {
        console.error(error);
      }
    });
  }

  logout() {
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('env');
    this.router.navigate(['/login']);
  }
}