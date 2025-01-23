import { inject, Injectable } from '@angular/core';
import { BeeService } from '../services/BeeService';
import { ResponseLogin } from '../models/database/dto/ResponseLogin';
import { User } from '../models/database/User';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  beeService = inject(BeeService);

  constructor() { }

  login(username: string, password: string) {
    return this.beeService.loginUser(username, password).pipe(tap((response) => this.storeUser(response)));
  }

  private storeUser(user: ResponseLogin) {
    sessionStorage.setItem('authUser', JSON.stringify(user));
  }

  isLoggedIn(){
    return sessionStorage.getItem('authUser') !== null;
  }

  getAuthUser(): User{
    let rep : ResponseLogin | null = JSON.parse(sessionStorage.getItem('authUser')!) as ResponseLogin;
    return rep.user;
  }
}
