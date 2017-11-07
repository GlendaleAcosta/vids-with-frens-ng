import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
import {Http} from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class RoomService {
  constructor(private http: Http) { }

  postRoom(){
   return this.http.post('/api/room', {hello: 'world'})
    .map(res => res.json())
    // .subscribe(res => res);
  // return this.http.post('/api/room', {hello: 'world'})
    // .map(res => res.json()).subscribe(res => res);
  // return this.http.get('/api/room').subscribe((res:Response) => res = res.json());
  }
}
