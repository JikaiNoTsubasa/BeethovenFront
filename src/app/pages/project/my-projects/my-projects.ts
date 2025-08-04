import { Component, inject } from '@angular/core';
import { DBService } from '../../../services/db.service';
import { Project } from '../../../models/dto/Project';
import { CommonModule } from '@angular/common';
import { Toolbar } from "../../../comps/toolbar/toolbar";
import { Card } from "../../../comps/card/card";
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-my-projects',
  imports: [CommonModule, Toolbar, Card, RouterModule],
  templateUrl: './my-projects.html',
  styleUrl: './my-projects.scss'
})
export class MyProjects {

  dbService = inject(DBService);

  projects: Project[] | null = null;
  loadingProjects: boolean = false;

  ngOnInit(){
    this.refreshMyProjects();
  }

  refreshMyProjects() {
    this.loadingProjects = true;
    this.dbService.fetchMyProjects().subscribe({
      next: (data) => {
        this.projects = data;
      },
      error: (error) => {
        console.error(error);
      },
      complete: () => {
        this.loadingProjects = false;
      }
    });
  }
}
