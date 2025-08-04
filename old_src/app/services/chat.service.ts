import { inject, Injectable } from '@angular/core';
import { Message } from '../models/database/Message';
import { User } from '../models/database/User';
import { BeeService } from './BeeService';
import { interval, Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  beeService = inject(BeeService);

  conv: Map<number, Message[]> = new Map();
  currentUserId: number | null = null;
  currentMessages: Message[] | null;
  currentMessageCount: number = 0;
  currentUsers: Set<User> = new Set;
  private refreshSubscription: Subscription;

  constructor() {
    this.refreshSubscription = interval(1000).subscribe(() => this.updateMyMessages());
  }

  public updateMyMessages(){
    this.beeService.getMyMessages().subscribe(messages => {
      this.conv.clear();
      messages.forEach(m => {
        if(!this.conv.has(m.sourceUser.id)){
          this.conv.set(m.sourceUser.id, []);
        }
        this.conv.get(m.sourceUser.id)?.push(m);

        this.addUniqueUser(m.sourceUser);

      });
      if (!this.currentUserId && this.conv.size > 0){
        this.currentUserId = this.conv.entries().next().value?.[0] ?? null;
      }

      if (this.currentUserId && this.currentMessageCount != messages.length){
        this.currentMessages = this.conv.get(this.currentUserId) as Message[];
        this.currentMessageCount = messages.length;
      }
    });
    
  }

  public selectUser(id: number){
    this.currentUserId = id;
    this.currentMessages = this.conv.get(id) as Message[];
  }

  private addUniqueUser(user: User){
    let contains = false;
    this.currentUsers.forEach(u => {
      if (u.id == user.id){
        contains = true;
      }
    });
    if (!contains){
      this.currentUsers.add(user);
    }
  }

}
