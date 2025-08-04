import { Component, inject, TemplateRef } from '@angular/core';
import { Card } from "../../../comps/card/card";
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { DBService } from '../../../services/db.service';
import { Project } from '../../../models/dto/Project';
import { Document } from '../../../models/dto/Document';
import { Tabs } from "../../../comps/tabs/tabs";
import { Tab } from '../../../comps/tab/tab';
import { PopupService } from '../../../services/PopupService';

@Component({
  selector: 'app-my-project-details',
  imports: [CommonModule, Card, RouterModule, Tabs, Tab],
  templateUrl: './my-project-details.html',
  styleUrl: './my-project-details.scss'
})
export class MyProjectDetails {

  dbService = inject(DBService);
  route = inject(ActivatedRoute);
  popupService = inject(PopupService);

  project: Project | null = null;
  loadingProject: boolean = false;

  documents: Document[] | null = null;
  loadingDocuments: boolean = false;

  currentId: number | null = null;

  ngOnInit(){
    this.refreshProject();
  }
  
  refreshProject(){
    this.loadingProject = true;
    this.route.params.subscribe(params => {
      this.currentId = params['id'];
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

  refreshProjectDocuments(){
    if (this.currentId) {
      this.loadingDocuments = true;
      this.dbService.fetchProjectDocuments(this.currentId).subscribe({
        next: (documents) => {
          this.documents = documents;
        },
        error: (error) => {
          console.error(error);
        },
        complete: () => {
          this.loadingDocuments = false;
        }
      });
    }
  }

  onTabChange(tab: string) {
    if (tab === 'Documents') {
      this.refreshProjectDocuments();
    }
  }

  openUploadDocumentModal(template: TemplateRef<any>) {
    this.popupService.open(template);
  }
}
