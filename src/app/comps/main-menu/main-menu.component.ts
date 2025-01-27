import { Component, inject } from '@angular/core';
import { User } from '../../models/database/User';
import { BeeService } from '../../services/BeeService';
import { AuthService } from '../../auth/auth.service';
import { FadeIn } from '../../animations';

@Component({
    selector: 'app-main-menu',
    standalone: true,
    imports: [],
    templateUrl: './main-menu.component.html',
    styleUrl: './main-menu.component.scss',
    animations: [FadeIn(1000, false)]
})
export class MainMenuComponent {

  beeService = inject(BeeService);
  authService = inject(AuthService);

  user: User | null = null;

  ngOnInit(){
    this.refreshUser();
  }

  refreshUser(){
    let id = this.authService.getAuthUser().id;

    this.beeService.getUser(id).subscribe(u => this.user = u);
  }

  logoutUser(){
    this.authService.logout();
  }
}
