import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { VideoSearchService } from '../../../services/videoSearch/video-search.service';
import { NgForm } from '@angular/forms';
import { SocketService } from '../../../services/socket/socket.service';


@Component({
  selector: 'app-video-sidebar',
  templateUrl: './video-sidebar.component.html',
  styleUrls: ['./video-sidebar.component.scss']
})
export class VideoSidebarComponent implements OnInit {
  videos;
  constructor(public videoSearchService: VideoSearchService, private socket:SocketService) { }

  ngOnInit() {
  }
  
  onSubmit(f: NgForm) {
    if (f.valid) {
      this.videoSearchService.getVideos(f.value.query)
      .subscribe(res => {
        console.log(res);
        const videos = res.items;
        this.videos = videos;
      })
    }
  }

  selectVideo(video) {
    // this.videoSearchService.changeVideo(video.id.videoId);
    this.socket.changeVideo(video.id.videoId);
  }

}
