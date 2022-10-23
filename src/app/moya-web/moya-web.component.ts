import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { ChatService } from './chat/chat.service';
import { WebSocketService } from './websocket.service';
import { WorkService } from './work/work.service';

@Component({
  selector: 'app-moya-web',
  templateUrl: './moya-web.component.html',
  styleUrls: ['./moya-web.component.scss']
})
export class MoyaWebComponent  {
  public usersMe$ = new BehaviorSubject<any | null>(null)
  constructor(private cs: ChatService, private work: WorkService, private ws: WebSocketService) {
    this.ws.received$.subscribe(msg => {
      if(msg?.usersMe) this.usersMe$.next(msg.usersMe)
    })
    this.getUsersMe()
   }
   getUsersMe(){
    this.ws.sendMessage({action: 'users-me'})
   }
}
