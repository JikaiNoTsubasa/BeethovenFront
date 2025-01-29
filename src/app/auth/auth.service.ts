import { inject, Injectable } from '@angular/core';
import { BeeService } from '../services/BeeService';
import { ResponseLogin } from '../models/database/dto/ResponseLogin';
import { User } from '../models/database/User';
import { tap } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  router = inject(Router);
  beeService = inject(BeeService);

  constructor() { }

  login(username: string, password: string) {
    return this.beeService.loginUser(username, password).pipe(tap((response) => {
      if (response.isLogged === true) {
        this.storeUser(response);
      }
    }));
  }

  private storeUser(user: ResponseLogin) {
    sessionStorage.setItem('authUser', user.accessToken);
  }

  isLoggedIn(){
    return sessionStorage.getItem('authUser') !== null;
  }

  getToken(): string{
    return sessionStorage.getItem('authUser') ?? '';
  }

  logout(){
    sessionStorage.removeItem('authUser');
    this.router.navigate(['/login']);
  }
}
