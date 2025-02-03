import { AfterContentInit, AfterViewInit, Component, ContentChildren, QueryList } from '@angular/core';
import { TabComponent } from '../tab/tab.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-tabs',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tabs.component.html',
  styleUrl: './tabs.component.scss'
})
export class TabsComponent implements AfterContentInit, AfterViewInit {
  @ContentChildren(TabComponent) tabs: QueryList<TabComponent> = new QueryList<TabComponent>();
  
  ngOnInit(){
    
  }
  

  ngAfterViewInit(): void {
    /*
    console.log("Init with tabs: ", this.tabs);
    
    this.activateTab(this.tabs.first);
    */
  }

  ngAfterContentInit() {
    let activeTabs = this.tabs.filter((tab) => tab.active);
    if (!activeTabs.length){
      this.activateTab(this.tabs.first);
    }
  }

  activateTab(tab: TabComponent) {
    this.tabs.forEach(t => t.active = false);
    tab.active = true;
  }
}
