import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { User } from '../../models/database/User';

@Component({
    selector: 'app-avatar',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './avatar.component.html',
    styleUrl: './avatar.component.scss'
})
export class AvatarComponent {
  @Input() name: string | null = null;
  @Input() tooltip: string | null = null;
  @Input() avatar: string | null = null;
  @Input() avatarSize: number | null = 20;
  @Input() user: User | null = null;
  @Input() showName: boolean = true;

  ngOnInit(){
    if (this.user != null){
      this.name = this.user.firstname + ' ' + this.user.lastname;
      this.avatar = this.user.avatar;
      this.tooltip = '<span style="font-weight: bold;">[#' + this.user.id + ']</span><br>' + this.user.firstname + ' ' + this.user.lastname + '<br>' + this.user.email + '<br><br><a class="sbi-avatar-tooltip-link" href="/user/' + this.user.id + '"><i class="fa fa-user"></i> View Profile</a>';
    }else{
      if (this.tooltip == null){
        this.tooltip = this.name;
      }
    }
  }
}
