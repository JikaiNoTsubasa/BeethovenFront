import { Component, inject } from '@angular/core';
import { User } from '../../models/database/User';
import { BeeService } from '../../services/BeeService';
import { AuthService } from '../../auth/auth.service';
import { FadeIn } from '../../animations';
import { Message } from '../../models/database/Message';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-main-menu',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './main-menu.component.html',
    styleUrl: './main-menu.component.scss',
    animations: [FadeIn(1000, false)]
})
export class MainMenuComponent {

  beeService = inject(BeeService);
  authService = inject(AuthService);

  user: User | null = null;
  messages: Message[] | null = null;

  ngOnInit(){
    this.refreshUser();
    this.refreshMessages();
  }

  refreshUser(){
    this.beeService.getMyUser().subscribe(u => this.user = u);
  }

  refreshMessages(){
    this.beeService.getMyMessages().subscribe(m => this.messages = m.filter(m => !m.isRead));
  }

  logoutUser(){
    this.authService.logout();
  }
}
