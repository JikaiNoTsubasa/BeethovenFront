import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-avatar',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './avatar.component.html',
    styleUrl: './avatar.component.scss'
})
export class AvatarComponent {
  @Input() name: string | null = null;
  @Input() avatar: string | null = null;
  @Input() avatarSize: number | null = 20;
}
