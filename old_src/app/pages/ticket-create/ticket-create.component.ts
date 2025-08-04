import { Component, inject } from '@angular/core';
import { MainMenuComponent } from "../../comps/main-menu/main-menu.component";
import { CommonModule } from '@angular/common';
import { BeeService } from '../../services/BeeService';
import { User } from '../../models/database/User';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Product } from '../../models/database/Product';
import { Router } from '@angular/router';
import { Priority } from '../../models/database/Priority';
import { TicketType } from '../../models/database/TicketType';

@Component({
    selector: 'app-ticket-create',
    standalone: true,
    imports: [MainMenuComponent, CommonModule, ReactiveFormsModule],
    templateUrl: './ticket-create.component.html',
    styleUrl: './ticket-create.component.scss'
})
export class TicketCreateComponent {


  beeService = inject(BeeService);
    router = inject(Router);
  
    users: User[] = [];
    products: Product[] = [];
    priorities: Priority[] = [];
    types: TicketType[] = [];
    error = '';
  
    form: FormGroup = new FormGroup({
        ticketName: new FormControl('', [Validators.required, Validators.minLength(5)]),
        ticketDesc: new FormControl(''),
        assignTo: new FormControl(''),
        reviewedBy: new FormControl(''),
        product: new FormControl(''),
        gitlabId: new FormControl(''),
        typeId: new FormControl('', [Validators.required]),
        priorityId: new FormControl('', [Validators.required]),
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
      this.beeService.getPriorities().subscribe({
        next: priorities => {
          this.priorities = priorities;
          this.form.controls['priorityId'].setValue(this.priorities[2].id);
        },
        error: err => console.log(err)
      });
      this.beeService.getTicketTypes().subscribe({
        next: types => {
          this.types = types
          this.form.controls['typeId'].setValue(this.types[0].id);
        },
        error: err => console.log(err)
      })
    }
  
    onSubmit(){
      if (this.form.invalid) {
        return;
      }
      this.beeService.createTicket(
        this.form.value.ticketName, 
        this.form.value.ticketDesc, 
        this.form.value.assignTo, 
        this.form.value.reviewedBy, 
        this.form.value.product,
        this.form.value.gitlabId,
        this.form.value.typeId,
        this.form.value.priorityId
      ).subscribe({
        next: ticket => this.router.navigate(['/tickets']),
        error: err => this.error = err.message
      });
    }
}
