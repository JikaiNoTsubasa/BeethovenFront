import { Component } from '@angular/core';
export interface DropdownBtnItem {
  label: string;
  icon?: string;
  value?: any;
  disabled?: boolean;
  divider?: boolean;
  action?: (item: DropdownBtnItem) => void | Promise<void>;
}
@Component({
  selector: 'app-button-dropdown',
  imports: [],
  templateUrl: './button-dropdown.html',
  styleUrl: './button-dropdown.scss'
})
export class ButtonDropdown {

}
