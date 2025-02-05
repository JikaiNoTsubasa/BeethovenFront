import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BeeService } from '../../services/BeeService';
import { User } from '../../models/database/User';
import { MainMenuComponent } from "../../comps/main-menu/main-menu.component";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-item',
  standalone: true,
  imports: [MainMenuComponent, CommonModule],
  templateUrl: './user-item.component.html',
  styleUrl: './user-item.component.scss'
})
export class UserItemComponent {

  beeService = inject(BeeService);
  route = inject(ActivatedRoute);

  user: User | null = null;

  ngOnInit(){
    this.refreshData();
  }

  refreshData() {
    let id = this.route.snapshot.paramMap.get('id');
    this.beeService.getUser(parseInt(id ?? '0')).subscribe(res => {
      this.user = res;
    });
  }
}
