import { Component } from '@angular/core';
import { Toast } from '../toaster.model';
import { ToasterService } from '../../../services/toaster.service';
import { animate, style, transition, trigger } from '@angular/animations';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'toaster',
  imports: [CommonModule],
  templateUrl: './toaster.html',
  styleUrl: './toaster.scss',
  animations: [
    trigger('toastAnimation', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(20px)' }),
        animate('300ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
      ]),
      transition(':leave', [
        animate('300ms ease-in', style({ opacity: 0, transform: 'translateY(-20px)' }))
      ])
    ])
  ]
})
export class Toaster {

  toasts: Toast[] = [];

  constructor(private toasterService: ToasterService) { }

  ngOnInit(): void {
    this.toasterService.toasts$.subscribe(toasts => {
      this.toasts = toasts;
    });
  }

  removeToast(id: string): void {
    this.toasterService.remove(id);
  }
}
