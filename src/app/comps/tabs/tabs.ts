import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { Tab } from '../tab/tab';

@Component({
  selector: 'tabs',
  imports: [ CommonModule ],
  templateUrl: './tabs.html',
  styleUrl: './tabs.scss'
})
export class Tabs {

  tabs: Tab[] = [];
  @Output() onTabChange: EventEmitter<string> = new EventEmitter<string>();

  activeIdx = 0;

  addTab(tab: Tab) {
    if (this.tabs.length === 0) {
      tab.active = true;
    }
    this.tabs.push(tab);
  }

  selectTab(tab:Tab){ {
    this.tabs.forEach((tab) => {
      tab.active = false;
      });
      tab.active = true;
      this.activeIdx = this.tabs.indexOf(tab);
      this.onTabChange.emit(tab.tabTitle);
    }
  }
}
