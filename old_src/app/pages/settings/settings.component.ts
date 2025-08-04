import { Component } from '@angular/core';
import { MainMenuComponent } from '../../comps/main-menu/main-menu.component';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [MainMenuComponent],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.scss'
})
export class SettingsComponent {

}
