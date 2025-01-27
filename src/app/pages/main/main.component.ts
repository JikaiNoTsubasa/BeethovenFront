import { Component } from '@angular/core';
import { MainMenuComponent } from "../../comps/main-menu/main-menu.component";

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [MainMenuComponent],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss'
})
export class MainComponent {
  
}
