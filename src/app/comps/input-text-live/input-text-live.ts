import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'input-text-live',
  imports: [],
  templateUrl: './input-text-live.html',
  styleUrl: './input-text-live.scss'
})
export class InputTextLive {

  @Input() param: string | null = null;
  @Output() paramChange = new EventEmitter<string | null>();

  onParamChange(event: any) {
    this.paramChange.emit(event.target.value);
  }
}
