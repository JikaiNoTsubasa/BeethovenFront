import { Component, inject } from '@angular/core';
import { UserService } from '../../services/user.service';
import { DBService } from '../../services/db.service';

@Component({
  selector: 'app-top-bar',
  imports: [],
  templateUrl: './top-bar.html',
  styleUrl: './top-bar.scss'
})
export class TopBar {

  userService = inject(UserService);
  userIdentifier: string = 'Unknown';
  
  urlEnv: string = sessionStorage.getItem('env') ?? 'undefined';

  dbService = inject(DBService);

  ngOnInit(){
    this.refreshMyUser();
  }

  refreshMyUser(){
    this.dbService.fetchMyUser().subscribe({
      next: (user) => {
        this.userService.currentUser = user;
      },
      error: (error) => {
        console.error(error);
      }
    });
  }

}
