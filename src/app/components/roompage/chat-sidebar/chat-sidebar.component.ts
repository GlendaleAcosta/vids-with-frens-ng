import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { SocketService } from '../../../services/socket/socket.service';

@Component({
  selector: 'app-chat-sidebar',
  templateUrl: './chat-sidebar.component.html',
  styleUrls: ['./chat-sidebar.component.scss']
})
export class ChatSidebarComponent implements OnInit {
  messages = [];
  constructor(private socket:SocketService) { }

  ngOnInit() {
    this.socket.message.subscribe(message => { 
      this.messages.push(message);
    });
  }

  onSubmit(f: NgForm) {
    const username = localStorage.getItem('username');
    if (f.valid && username) {
      const userSubmission = {
        username: username,
        message: f.value.message,
      }
      this.socket.sendMessage(userSubmission);
      f.reset();
    }
  }
}
