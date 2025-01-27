import { Component, inject } from '@angular/core';
import { MainMenuComponent } from "../../comps/main-menu/main-menu.component";
import { CommonModule } from '@angular/common';
import { BeeService } from '../../services/BeeService';
import { User } from '../../models/database/User';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Product } from '../../models/database/Product';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ticket-item',
  standalone: true,
  imports: [MainMenuComponent, CommonModule, ReactiveFormsModule],
  templateUrl: './ticket-item.component.html',
  styleUrl: './ticket-item.component.scss'
})
export class TicketItemComponent {

  beeService = inject(BeeService);
  router = inject(Router);

  users: User[] = [];
  products: Product[] = [];
  error = '';

  form: FormGroup = new FormGroup({
      ticketName: new FormControl('', [Validators.required, Validators.minLength(5)]),
      ticketDesc: new FormControl(''),
      assignTo: new FormControl(''),
      reviewedBy: new FormControl(''),
      product: new FormControl(''),
    });

  ngOnInit() {
    this.refreshData();
  }

  refreshData() {
    this.beeService.getUsers().subscribe({
      next: users => this.users = users,
      error: err => console.log(err)
    });

    this.beeService.getProducts().subscribe({
      next: products => this.products = products,
      error: err => console.log(err)
    });
  }

  onSubmit(){
    this.beeService.createTicket(
      this.form.value.ticketName, 
      this.form.value.ticketDesc, 
      this.form.value.assignTo, 
      this.form.value.reviewedBy, 
      this.form.value.product,
      this.form.value.gitlabId
    ).subscribe({
      next: ticket => this.router.navigate(['/tickets']),
      error: err => this.error = err.message
    });
  }
}
