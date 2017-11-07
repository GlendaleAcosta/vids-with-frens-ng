import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { Http, HttpModule } from '@angular/http';

import { RoomService } from './services/room.service';
import { VideoSearchService } from './services/videoSearch/video-search.service';
import { SocketService } from './services/socket/socket.service';

import { SafePipe } from './pipes/safe.pipe';

import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HomeComponent } from './components/homepage/home/home.component';
import { CreateRoomModalComponent } from './components/modals/create-room-modal/create-room-modal.component';
import { RoomComponent } from './components/roompage/room/room.component';
import { VideoSidebarComponent } from './components/roompage/video-sidebar/video-sidebar.component';
import { ChatSidebarComponent } from './components/roompage/chat-sidebar/chat-sidebar.component';
import { RoomVideoComponent } from './components/roompage/room-video/room-video.component';

const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'room/:roomId', component: RoomComponent },
  // { path: 'hero/:id',      component: HeroDetailComponent },
  // {
  //   path: 'heroes',
  //   component: HeroListComponent,
  //   data: { title: 'Heroes List' }
  // },
  // { path: '',
  //   redirectTo: '/heroes',
  //   pathMatch: 'full'
  // },
  // { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    CreateRoomModalComponent,
    RoomComponent,
    VideoSidebarComponent,
    ChatSidebarComponent,
    RoomVideoComponent,
    SafePipe,
  ],
  imports: [
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true } // <-- debugging purposes only
    ),
    BrowserModule,
    FormsModule,
    HttpClientModule,
    HttpModule,
  ],
  exports: [HttpModule],
  providers: [
    RoomService,
    VideoSearchService,
    SocketService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
