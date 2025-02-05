import { Component, inject } from '@angular/core';
import { MainMenuComponent } from "../../comps/main-menu/main-menu.component";
import { TabsComponent } from "../../comps/tabs/tabs/tabs.component";
import { TabComponent } from "../../comps/tabs/tab/tab.component";
import { BeeService } from '../../services/BeeService';
import { User } from '../../models/database/User';
import { CommonModule } from '@angular/common';
import { AvatarComponent } from "../../comps/avatar/avatar.component";
import { FadeIn } from '../../animations';
import { Ticket } from '../../models/database/Ticket';
import { ChipsComponent } from "../../comps/chips/chips.component";

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [MainMenuComponent, TabsComponent, TabComponent, CommonModule, AvatarComponent, ChipsComponent],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss',
  animations: [FadeIn(1000, false)]
})
export class AdminComponent {

  beeService = inject(BeeService);

  users: User[] | null = null;

  tickets: Ticket[] | null = null;
  ticketsClosed: number = 0;
  ticketsAssigned: number = 0;
  ticketsOnHold: number = 0;

  ngOnInit() {
    this.refreshUsers();
    this.refreshTickets();
  }

  refreshUsers() {
    this.beeService.getUsers().subscribe((users) => this.users = users);
  }

  refreshTickets() {
    this.beeService.getTickets().subscribe((tickets) => {
      this.tickets = tickets;
      this.ticketsClosed = this.tickets?.filter(t => t.status.id === 5).length + this.tickets?.filter(t => t.status.id === 6).length;
      this.ticketsAssigned = this.tickets?.filter(t => t.status.id === 2).length ?? 0;
      this.ticketsOnHold = this.tickets?.filter(t => t.status.id === 4).length ?? 0;
    });
  }

  teamNames(user: User) {
    return user.teams.map(u => u.name);
  }
}
