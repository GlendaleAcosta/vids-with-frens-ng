import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { VideoSearchService } from '../../../services/videoSearch/video-search.service';
import { DomSanitizer } from '@angular/platform-browser';
import { SocketService } from '../../../services/socket/socket.service';
import * as YouTubePlayer from 'youtube-player';
import * as YTPlayer from 'yt-player';

@Component({
  selector: 'app-room-video',
  templateUrl: './room-video.component.html',
  styleUrls: ['./room-video.component.scss']
})
export class RoomVideoComponent implements OnInit {
  videoId;
  videoSrc;
  player;
  fromServer = false;
  canBroadcast = true;
  constructor(
    public videoSearchService: VideoSearchService,
    private sanitizer: DomSanitizer,
    private socket:SocketService
  ) {}

  ngOnInit() {
    this.player = new YTPlayer('#playerid', {
      autoplay: false,
      width: '100%',
      height: '100%',
    })
  
    this.socket.currentVideo.subscribe(videoId => { 
      if (videoId != null) {
        this.player.load(videoId, false);
      }
    });

    this.player.on('playing', () => {
      const time = this.player.getCurrentTime();
      if (!this.fromServer && this.canBroadcast) {
        setTimeout(() => {
          this.canBroadcast = true;
        }, 200);
        this.socket.playVideo(time);
      } else {
        this.fromServer = false;
      }
    })

    this.player.on('paused', (test) => {
      const time = this.player.getCurrentTime();
      if(!this.fromServer && this.canBroadcast) {
        console.log(this.canBroadcast);
        setTimeout(() => {
          this.canBroadcast = true;
        }, 200);
        this.socket.pauseVideo(time);
      } else {
        this.fromServer = false;
      }
    })

    
    this.socket.isVideoPlaying.subscribe(videoIsPlaying => {
      this.fromServer = videoIsPlaying.fromServer;
      const errorTime = this.player.getCurrentTime() - videoIsPlaying.time;
      
      if (videoIsPlaying.playing) {
        if (errorTime < -0.3 || errorTime > 0.3) {
          this.player.seek(videoIsPlaying.time);
        }
        this.player.play();
      }
      else if (!videoIsPlaying.playing) {
        if (errorTime < -0.3 || errorTime > 0.3) {
          this.player.seek(videoIsPlaying.time);
        }
        this.player.pause();
      }

      this.fromServer = false;
    })
  }


}
