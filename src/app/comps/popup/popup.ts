import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output, TemplateRef } from '@angular/core';

@Component({
  selector: 'popup',
  imports: [ CommonModule, ],
  templateUrl: './popup.html',
  styleUrl: './popup.scss'
})
export class Popup {
  @Input() isOpen = false;
  @Input() title = '';
  @Output() closed = new EventEmitter<void>();
  @Input() content?: TemplateRef<any>;
  @Input() context: any = {};

  close() {
    this.isOpen = false;
    this.closed.emit();
  }
}
