import { Injectable } from '@angular/core';
import { debug } from 'console';
import Peer, { MediaConnection, PeerJSOption } from 'peerjs';
import { config } from 'process';
import { BehaviorSubject, Subject } from 'rxjs';
import { v4 as uuidv4 } from 'uuid';

@Injectable({
  providedIn: 'root'
})
export class CallService {

  private peer: Peer | null = null;
  private mediaCall: MediaConnection | undefined;

  private localStreamBs: BehaviorSubject<MediaStream> = new BehaviorSubject(undefined as unknown as MediaStream);
  public localStream$ = this.localStreamBs.asObservable();
  private remoteStreamBs: BehaviorSubject<MediaStream> = new BehaviorSubject(undefined as unknown as MediaStream);
  public remoteStream$ = this.remoteStreamBs.asObservable();

  private isCallStartedBs = new Subject<boolean>();
  public isCallStarted$ = this.isCallStartedBs.asObservable();

  constructor() { }

  public initPeer(): string | null {
    if (!this.peer || this.peer.disconnected){
      const peeJsOptions: PeerJSOption = {
        debug: 3,
        config: {
          iceServers: [
            { 
              urls: ['stun:stun1.l.google.com:19302','stun:stun2.l.google.com:19302'] 
            },
          ],
        }
      };
      try{
        let id = uuidv4();
        this.peer = new Peer(id, peeJsOptions);
        return id;
      }catch(e){
        console.error(e);
      }
    }
    return null;
  }

  public async establishMediaCall(peerId: string): Promise<void> {
    try{
      const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      const connection = this.peer?.connect(peerId);
      connection?.on('error', err => {
        console.error(err);
      });
      this.mediaCall = this.peer?.call(peerId, stream);
      if (!this.mediaCall){
        let errorMessage = 'Unable to establish media call';
        throw new Error(errorMessage);
      }
      this.localStreamBs.next(stream);
      this.isCallStartedBs.next(true);

      this.mediaCall.on('stream', (remoteStream) => this.remoteStreamBs.next(remoteStream));

      this.mediaCall.on('close', () => this.onCallClose());

    }catch(e){
      console.error(e);
      this.isCallStartedBs.next(false);
    }
  }

  public onCallClose(){
    this.remoteStreamBs.value.getTracks().forEach(track => track.stop());
    this.localStreamBs.value.getTracks().forEach(track => track.stop());
  }

  public async enableCallAnswer(){
    try{
      const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      this.localStreamBs.next(stream);
      this.peer?.on('call', async (call) => {
        this.mediaCall = call;
        this.isCallStartedBs.next(true);

        this.mediaCall.answer(stream);
        this.mediaCall.on('stream', (remoteStream) => this.remoteStreamBs.next(remoteStream));
        this.mediaCall.on('close', () => this.onCallClose());
        this.mediaCall.on('error', err => {
          console.error(err);
          this.isCallStartedBs.next(false);
        });
      });
    }catch(ex){
      console.log(ex);
    }
  }

  public closeMediaCall(){
    this.mediaCall?.close();
    if (!this.mediaCall){
      this.onCallClose();
    }
    this.isCallStartedBs.next(false);
  }

  public destroyPeer(){
    this.mediaCall?.close();
    this.peer?.disconnect();
    this.peer?.destroy();
  }
}
