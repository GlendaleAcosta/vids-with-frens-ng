import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import {NgForm} from '@angular/forms';
import { Router } from '@angular/router';
import { RoomService } from '../../../services/room.service';

@Component({
  selector: 'app-create-room-modal',
  templateUrl: './create-room-modal.component.html',
  styleUrls: ['./create-room-modal.component.scss']
})
export class CreateRoomModalComponent implements OnInit {
  @Input() show: boolean;
  @Output() showModal = new EventEmitter<boolean>();
  constructor(public router:Router, public roomService: RoomService) { }

  ngOnInit() {
  }

  closeModal() {
    this.show = false;
    this.showModal.emit(this.show);
  }

  onSubmit(f: NgForm) {
    const guestname = f.value.guestname;
    if (f.valid) {
      const that = this;
      this.roomService.postRoom().subscribe(res => {
        // console.log(res);
        that.router.navigateByUrl(`/room/${res.roomId}`);
      });
      // console.log(test);
      
    }
    console.log(f.valid);
  }

}
