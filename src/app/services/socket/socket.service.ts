import { Injectable } from '@angular/core';
import io from 'socket.io-client';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class SocketService {
  private videoSrc = new BehaviorSubject<string>(null);
  currentVideo = this.videoSrc.asObservable();
  socket;
  private videoPlaying = new BehaviorSubject<any>({
    playing: false,
    fromServer: false,
    time: 0,
  });
  isVideoPlaying = this.videoPlaying.asObservable();
  
  constructor() {
    
  }

  joinRoom(roomId) {
    this.socket = io('http://localhost:3201', {query: {roomId}});
    this.socket.on('current video', (videoId) => {
      this.videoSrc.next(videoId);
    });
    this.socket.on('play video', (videoStatus) => {
      // console.log(`HOLT SHIT SOMEONE UPDATED THE TIME TO ${time}`);
      this.videoPlaying.next(videoStatus);
    });
    this.socket.on('pause video', (videoStatus) => {
      // console.log(`HOLT SHIT SOMEONE UPDATED THE TIME TO ${time}`);
      this.videoPlaying.next(videoStatus);
    });
  }
  
  changeVideo(videoId) {
    this.socket.emit('change video', videoId);
  }

  playVideo(time) {
    this.socket.emit('play video', time);
  }

  pauseVideo(time) {
    this.socket.emit('pause video', time);
  }
}
