import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-logout',
  imports: [],
  templateUrl: './logout.html',
  styleUrl: './logout.scss'
})
export class Logout {

  router = inject(Router);
  authService = inject(AuthService);

  ngOnInit(){
    this.logout();
  }

  logout() {
    this.authService.logout();
  }
  constructor() { }
}
