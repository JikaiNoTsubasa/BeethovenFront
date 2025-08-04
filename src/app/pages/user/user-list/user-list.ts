import { Component, inject, OnInit } from '@angular/core';
import { Card } from "../../../comps/card/card";
import { DBService } from '../../../services/db.service';
import { User } from '../../../models/dto/User';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Toolbar } from "../../../comps/toolbar/toolbar";

@Component({
  selector: 'app-user-list',
  imports: [Card, CommonModule, RouterModule, Toolbar],
  templateUrl: './user-list.html',
  styleUrl: './user-list.scss'
})
export class UserList {

  dbService = inject(DBService);

  users: User[] | null = null;
  loadingUsers: boolean = false;

  ngOnInit() {
    this.refreshUsers();
  }

  refreshUsers() {
    this.loadingUsers = true;
    this.dbService.fetchUsers().subscribe({
      next: (data) => {
        // console.log(data);
        this.users = data;
        this.loadingUsers = false;
      },
      error: (error) => {
        console.error(error);
      },
      complete: () => {
        // console.log('complete');
        this.loadingUsers = false;
      }
    });
  }
}
