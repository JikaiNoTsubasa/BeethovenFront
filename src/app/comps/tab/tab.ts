import { Component, Input } from '@angular/core';
import { Tabs } from '../tabs/tabs';

@Component({
  selector: 'tab',
  imports: [],
  templateUrl: './tab.html',
  styleUrl: './tab.scss'
})
export class Tab {

  @Input() tabTitle: string = 'Default';
  @Input() tabIcon: string | null = null;

  active: boolean = false;

  constructor(tabs: Tabs) {
    tabs.addTab(this);
  }
}
