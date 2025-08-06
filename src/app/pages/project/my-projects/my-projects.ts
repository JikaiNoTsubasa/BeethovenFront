import { Component, inject, TemplateRef } from '@angular/core';
import { DBService } from '../../../services/db.service';
import { Project } from '../../../models/dto/Project';
import { CommonModule } from '@angular/common';
import { Toolbar } from "../../../comps/toolbar/toolbar";
import { Card } from "../../../comps/card/card";
import { RouterModule } from '@angular/router';
import { PopupService } from '../../../services/PopupService';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-my-projects',
  imports: [CommonModule, Toolbar, Card, RouterModule, ReactiveFormsModule],
  templateUrl: './my-projects.html',
  styleUrl: './my-projects.scss'
})
export class MyProjects {

  dbService = inject(DBService);
  popupService = inject(PopupService);

  projects: Project[] | null = null;
  loadingProjects: boolean = false;

  createPrjForm = new FormGroup({
    name: new FormControl(''),
    initializePhases: new FormControl(true),
  });

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

  openDialogNewProject(template: TemplateRef<any>){
    this.popupService.open(template);
  }

  createProject(){

  }
}
