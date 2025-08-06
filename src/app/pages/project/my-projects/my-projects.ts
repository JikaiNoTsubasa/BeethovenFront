import { Component, inject, TemplateRef } from '@angular/core';
import { DBService } from '../../../services/db.service';
import { Project } from '../../../models/dto/Project';
import { CommonModule } from '@angular/common';
import { Toolbar } from "../../../comps/toolbar/toolbar";
import { Card } from "../../../comps/card/card";
import { RouterModule } from '@angular/router';
import { PopupService } from '../../../services/PopupService';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Customer } from '../../../models/dto/Customer';

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

  customers: Customer[] | null = null;
  loadingCustomers: boolean = false;

  createPrjForm = new FormGroup({
    name: new FormControl(''),
    initializePhases: new FormControl(true),
    customerId: new FormControl('')
  });

  ngOnInit(){
    this.refreshCustomers();
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

  refreshCustomers() {
    this.loadingCustomers = true;
    this.dbService.fetchCustomers().subscribe({
      next: (data) => {
        this.customers = data;
      },
      error: (error) => {
        console.error(error);
      },
      complete: () => {
        this.loadingCustomers = false;
      }
    });
  }

  openDialogNewProject(template: TemplateRef<any>){
    this.popupService.open(template);
  }

  createProject(){
    let name: string = this.createPrjForm.value.name ?? '';
    let initializePhases: boolean = this.createPrjForm.value.initializePhases ?? false;
    let customerId: number | undefined = undefined;
    if (this.createPrjForm.value.customerId != null && this.createPrjForm.value.customerId != ''){
      customerId = parseInt(this.createPrjForm.value.customerId);
    }
    this.dbService.createProject(name, initializePhases, customerId).subscribe({
      next: (data) => {
        this.refreshMyProjects();
      },
      error: (error) => {
        console.error(error);
      },
      complete: () => {
        this.popupService.close();
        this.createPrjForm.reset();
      }
    });
  }
}
