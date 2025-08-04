import { Component, inject } from '@angular/core';
import { Card } from "../../../comps/card/card";
import { DBService } from '../../../services/db.service';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { User } from '../../../models/dto/User';
import { CommonModule } from '@angular/common';
import { Role } from '../../../models/dto/Role';
import { Toolbar } from "../../../comps/toolbar/toolbar";

@Component({
  selector: 'app-user-detail',
  imports: [Card, CommonModule, Toolbar, RouterModule],
  templateUrl: './user-detail.html',
  styleUrl: './user-detail.scss'
})
export class UserDetail {

  dbService = inject(DBService);
  route = inject(ActivatedRoute);

  user: User | null = null;
  roles: Role[] | null = null;

  ngOnInit(){
    this.refreshUser();
  }

  refreshUser(){
    this.route.params.subscribe(params => {
      this.dbService.fetchUser(params['id']).subscribe({
        next: (user) => {
          this.user = user;
        },
        error: (error) => {
          console.error(error);
        },
        complete: () => {
          this.refreshRoles();
        }
      });
    })
  }

  refreshRoles(){
    this.route.params.subscribe(params => {
      this.dbService.fetchUserRoles(params['id']).subscribe({
        next: (roles) => {
          this.roles = roles;
        },
        error: (error) => {
          console.error(error);
        }
      });
    })
  }
}
