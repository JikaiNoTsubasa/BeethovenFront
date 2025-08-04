import { Component, ElementRef, inject, ViewChild } from '@angular/core';
import { User } from '../../models/database/User';
import { BeeService } from '../../services/BeeService';
import { AuthService } from '../../auth/auth.service';
import { FadeIn } from '../../animations';
import { Message } from '../../models/database/Message';
import { CommonModule } from '@angular/common';
import { ChatService } from '../../services/chat.service';
import { AvatarComponent } from '../avatar/avatar.component';
import { RouterModule } from '@angular/router';

@Component({
    selector: 'app-main-menu',
    standalone: true,
    imports: [CommonModule, AvatarComponent, RouterModule],
    templateUrl: './main-menu.component.html',
    styleUrl: './main-menu.component.scss',
    animations: [FadeIn(1000, false)]
})
export class MainMenuComponent {

  beeService = inject(BeeService);
  authService = inject(AuthService);
  chatService = inject(ChatService);

  @ViewChild('chatboxTitle') chatboxTitle: ElementRef<HTMLDivElement>;
  @ViewChild('chatboxContent') chatboxContent: ElementRef<HTMLDivElement>;

  user: User | null = null;

  ngOnInit(){
    this.refreshUser();
  }

  refreshUser(){
    this.beeService.getMyUser().subscribe(u => this.user = u);
  }

  logoutUser(){
    this.authService.logout();
  }

  openChatBox(){
    this.chatboxTitle.nativeElement.style.display = 'none';
    this.chatboxContent.nativeElement.style.display = 'block';
  }

  closeChatBox(){
    this.chatboxTitle.nativeElement.style.display = 'block';
    this.chatboxContent.nativeElement.style.display = 'none';
  }
}
