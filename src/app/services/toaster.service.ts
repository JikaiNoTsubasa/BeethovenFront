// toaster.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Toast, ToastType } from '../comps/toaster/toaster.model';

@Injectable({
  providedIn: 'root'
})
export class ToasterService {
  private toasts = new BehaviorSubject<Toast[]>([]);
  private defaultTimeout = 5000; // 5 secondes par défaut

  toasts$ = this.toasts.asObservable();

  constructor() { }

  private generateId(): string {
    return Math.random().toString(36).substring(2, 9);
  }

  show(message: string, type: ToastType = 'info', title?: string, timeout?: number): void {
    const toast: Toast = {
      id: this.generateId(),
      message,
      type,
      title,
      timeout: timeout || this.defaultTimeout,
      createdAt: new Date()
    };

    const currentToasts = this.toasts.getValue();
    this.toasts.next([...currentToasts, toast]);

    // Suppression automatique après le timeout
    if (timeout !== 0) {
      setTimeout(() => this.remove(toast.id), toast.timeout);
    }
  }

  success(message: string, title?: string, timeout?: number): void {
    this.show(message, 'success', title, timeout);
  }

  error(message: string, title?: string, timeout?: number): void {
    this.show(message, 'error', title, timeout);
  }

  warning(message: string, title?: string, timeout?: number): void {
    this.show(message, 'warning', title, timeout);
  }

  info(message: string, title?: string, timeout?: number): void {
    this.show(message, 'info', title, timeout);
  }

  remove(id: string): void {
    const currentToasts = this.toasts.getValue();
    this.toasts.next(currentToasts.filter(toast => toast.id !== id));
  }

  clear(): void {
    this.toasts.next([]);
  }
}
