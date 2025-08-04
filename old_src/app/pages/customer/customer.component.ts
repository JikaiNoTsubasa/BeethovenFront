import { Component, inject } from '@angular/core';
import { BeeService } from '../../services/BeeService';
import { Customer } from '../../models/database/Customer';
import { MainMenuComponent } from "../../comps/main-menu/main-menu.component";
import { CommonModule } from '@angular/common';
import { RouterModule, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-customer',
  standalone: true,
  imports: [MainMenuComponent, CommonModule, RouterModule],
  templateUrl: './customer.component.html',
  styleUrl: './customer.component.scss'
})
export class CustomerComponent {

  beeService = inject(BeeService);

  customers: Customer[] | null = null;
  loading: boolean = true;

  ngOnInit() {
    this.refreshCustomers();
  }

  refreshCustomers() {
    this.beeService.getCustomers().subscribe(res => {
      this.customers = res;
      this.loading = false;
    });
  }
}
