import { Component, ElementRef, ViewChild } from '@angular/core';
import { filter, Observable } from 'rxjs';
import { CallService } from '../../services/call.service';
import { MainMenuComponent } from "../../comps/main-menu/main-menu.component";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-call',
  standalone: true,
  imports: [MainMenuComponent, CommonModule],
  templateUrl: './call.component.html',
  styleUrl: './call.component.scss'
})
export class CallComponent {

  public isCallStarted$: Observable<boolean> | null = null;
  peerId: string | null = null;
  message: string;

  @ViewChild('localVideo') localVideo: ElementRef<HTMLVideoElement>;
  @ViewChild('remoteVideo') remoteVideo: ElementRef<HTMLVideoElement>;

  constructor(private callService: CallService) {
    this.isCallStarted$ = this.callService.isCallStarted$;
  }

  ngAfterViewInit(){
    this.callService.localStream$.pipe(filter(s => !!s)).subscribe(s => this.localVideo.nativeElement.srcObject = s);
    this.callService.remoteStream$.pipe(filter(s => !!s)).subscribe(s => this.remoteVideo.nativeElement.srcObject = s);
  }

  ngOnDestroy(){
    this.callService.destroyPeer();
  }

  public endCall(){
    this.callService.closeMediaCall();
  }

  public startCall(){
    var id = this.callService.initPeer();
    if (id != null) {
      this.peerId = id;
      this.callService.establishMediaCall(id);
      this.callService.enableCallAnswer();
    }else{
      this.message = "Unable to start call, peer id is null";
    }
  }
}
