import { Component, inject } from '@angular/core';
import { MainMenuComponent } from "../../comps/main-menu/main-menu.component";
import { BeeService } from '../../services/BeeService';
import { TablePagination } from '../../models/database/TablePagination';
import { Ticket } from '../../models/database/Ticket';
import { CommonModule } from '@angular/common';
import { FadeIn } from '../../animations';
import { AvatarComponent } from "../../comps/avatar/avatar.component";
import { PrioPipe } from "../../pipes/prio.pipe";
import { RouterModule } from '@angular/router';

@Component({
    selector: 'app-ticket',
    standalone: true,
    imports: [MainMenuComponent, CommonModule, AvatarComponent, PrioPipe, RouterModule],
    templateUrl: './ticket.component.html',
    styleUrl: './ticket.component.scss',
    animations: [FadeIn(1000, false)]
})
export class TicketComponent {
  beeService = inject(BeeService);
  loading: boolean = false;

  meta: TablePagination = new TablePagination();
  tickets: Ticket[] = [];
  headers: string[] = ['id', 'name', 'description', 'assignedTo', 'reviewedBy', 'status', 'createdAt', 'updatedAt'];

  ngOnInit() {
    this.refreshTickets();
  }

  refreshTickets(){
    this.loading = true;
    this.beeService.getTicketsFull().subscribe(
      res => {
        this.meta.page = +(res.headers.get('page') ?? 1);
        this.meta.pageSize = +(res.headers.get('page-size') ?? 1);
        this.meta.pageCount = +(res.headers.get('page-count') ?? 1);
        this.meta.total = +(res.headers.get('total') ?? 1);

        this.tickets = res.body ?? [];
        this.loading = false;
      }
    );
    }

}
