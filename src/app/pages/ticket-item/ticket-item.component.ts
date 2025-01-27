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

@Component({
  selector: 'app-ticket-item',
  standalone: true,
  imports: [MainMenuComponent, CommonModule, ReactiveFormsModule, AvatarComponent],
  templateUrl: './ticket-item.component.html',
  styleUrl: './ticket-item.component.scss'
})
export class TicketItemComponent {

  beeService = inject(BeeService);
  router = inject(Router);
  route = inject(ActivatedRoute);

  ticket: Ticket | null = null;
  users: User[] = [];
  products: Product[] = [];
  error = '';

  form: FormGroup = new FormGroup({
    ticketName: new FormControl('', [Validators.required, Validators.minLength(5)]),
    ticketDesc: new FormControl(''),
    assignTo: new FormControl(''),
    reviewedBy: new FormControl(''),
    product: new FormControl(''),
    gitlabId: new FormControl(''),
  });

  ngOnInit() {
    this.refreshData();
  }

  refreshData() {
    this.beeService.getUsers().subscribe({
      next: users => this.users = users,
      error: err => console.log(err),
      complete: () => {
      }
    });
    this.beeService.getProducts().subscribe({
      next: products => {this.products = products;},
      error: err => console.log(err)
    });

    let id = this.route.snapshot.paramMap.get('id');
    this.beeService.getTicket(parseInt(id ?? '0')).subscribe(res => {
      this.ticket = res;
      this.form.value.ticketName = this.ticket.name;
      this.form.value.ticketDesc = this.ticket.description;
      this.form.value.assignTo = this.ticket.assignedTo?.id;
      this.form.value.reviewedBy = this.ticket.reviewedBy?.id;
      this.form.value.product = this.ticket.product?.id;
      this.form.value.gitlabId = this.ticket.gitlabTicketId;
  });
  }

  onSubmit() {

  }

}
