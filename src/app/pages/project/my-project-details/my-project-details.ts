import { Component, inject } from '@angular/core';
import { Toolbar } from "../../../comps/toolbar/toolbar";
import { Card } from "../../../comps/card/card";
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { DBService } from '../../../services/db.service';
import { Project } from '../../../models/dto/Project';

@Component({
  selector: 'app-my-project-details',
  imports: [CommonModule, Toolbar, Card, RouterModule],
  templateUrl: './my-project-details.html',
  styleUrl: './my-project-details.scss'
})
export class MyProjectDetails {

  dbService = inject(DBService);
  route = inject(ActivatedRoute);

  project: Project | null = null;
  loadingProject: boolean = false;

  ngOnInit(){
    this.refreshProject();
  }
  
  refreshProject(){
    this.loadingProject = true;
    this.route.params.subscribe(params => {
      this.dbService.fetchMyProject(params['id']).subscribe({
        next: (project) => {
          this.project = project;
        },
        error: (error) => {
          console.error(error);
        },
        complete: () => {
          this.loadingProject = false;
        }
      });
    })
  }
}
