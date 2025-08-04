import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PopupService } from './services/PopupService';
import { Popup } from './comps/popup/popup';

@Component({
  selector: 'app-root',
  imports: [ RouterModule, Popup ],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  isOpen = false;
  contentTemplate?: any;
  context: any = {};

  constructor(public popupService: PopupService) {
    this.popupService.popupState$.subscribe(state => {
      this.isOpen = state.isOpen;
      this.contentTemplate = state.content;
      this.context = state.context ?? {};
    });
  }
}
