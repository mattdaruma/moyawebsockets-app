import { Component } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ChatService } from './chat/chat.service';
import { WebSocketService } from './websocket.service';

@Component({
  selector: 'app-moya-web',
  templateUrl: './moya-web.component.html',
  styleUrls: ['./moya-web.component.scss']
})
export class MoyaWebComponent  {
  public usersMe$ = new BehaviorSubject<any | null>(null)
  public socketConnected$ = new BehaviorSubject<boolean>(false)
  constructor(private cs: ChatService, private ws: WebSocketService) {
    this.ws.received$.subscribe(msg => {
      if(msg?.usersMe) {
        console.log('me', msg.usersMe)
        this.usersMe$.next(msg.usersMe)
      }
    })
    this.ws.open$.subscribe(()=>{
      this.socketConnected$.next(true)
      this.getUsersMe()
    })
    this.ws.closing$.subscribe(()=>{
      this.socketConnected$.next(false)
      this.usersMe$.next(null)
    })
    this.ws.closed$.subscribe(()=>{
      this.socketConnected$.next(false)
      this.usersMe$.next(null)
    })
   }
   getUsersMe(){
    this.ws.sendMessage({action: 'users-me'})
   }
}
