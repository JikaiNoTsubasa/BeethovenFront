import { Component, inject } from '@angular/core';
import { MainMenuComponent } from "../../comps/main-menu/main-menu.component";
import { CommonModule } from '@angular/common';
import { BeeService } from '../../services/BeeService';
import { User } from '../../models/database/User';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Product } from '../../models/database/Product';
import { ActivatedRoute, Router } from '@angular/router';
import { Ticket } from '../../models/database/Ticket';
import { AvatarComponent } from "../../comps/avatar/avatar.component";
import { DescriptionMKPipe } from '../../pipes/description-mk.pipe';

@Component({
  selector: 'app-ticket-item',
  standalone: true,
  imports: [MainMenuComponent, CommonModule, ReactiveFormsModule, AvatarComponent, DescriptionMKPipe],
  templateUrl: './ticket-item.component.html',
  styleUrl: './ticket-item.component.scss'
})
export class TicketItemComponent {

  beeService = inject(BeeService);
  router = inject(Router);
  route = inject(ActivatedRoute);

  ticket: Ticket | null = null;
  error = '';

  ngOnInit() {
    this.refreshData();
  }

  refreshData() {
    let id = this.route.snapshot.paramMap.get('id');
    this.beeService.getTicket(parseInt(id ?? '0')).subscribe(res => {
      this.ticket = res;

      this.ticket.activities = this.ticket.activities.sort((a: any, b: any) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
    });
  }

}
