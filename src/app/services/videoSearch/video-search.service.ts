import { Injectable } from '@angular/core';
import {Http} from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import 'rxjs/add/operator/map';
import { SocketService } from '../socket/socket.service';

@Injectable()
export class VideoSearchService {
  private videoSrc = new BehaviorSubject<string>('fzQ6gRAEoy0');
  currentVideo = this.videoSrc.asObservable();

  constructor(private http: Http, private socket:SocketService) { }

  getVideos(query:String) {
    return this.http.get('https://www.googleapis.com/youtube/v3/search', {
      params: {
        maxResults: '10',
        part: 'snippet',
        q: query,
        key: 'AIzaSyCCw7UEn1SI4ITfARHB-B5Av-H3fxIx77o',
      }
    })
    .map(res => res.json())
  }

  selectVideo() {
    
  }

  changeVideo(videoId: string) {
    this.socket.changeVideo(videoId);
    this.videoSrc.next(videoId);
  }


}
