import { Injectable } from '@angular/core';
import { Subject, BehaviorSubject, first, ReplaySubject } from 'rxjs';
import { WebSocketService } from '../websocket.service';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  public usersOnline$ = new BehaviorSubject<any[]>([])
  public usersChat$ = new ReplaySubject<any>(50)
  public users$ = new BehaviorSubject<any[]>([])
  constructor(private ws: WebSocketService) {
    this.ws.open$.subscribe(openMsg => {
      this.getUsersOnline()
      this.getUsersAll()
    })
    this.ws.received$.subscribe(msg => {
      if(msg?.usersOnline) this.usersOnline$.next(msg.usersOnline)
      if(msg?.usersChat) this.usersChat$.next(msg.usersChat)
      if(msg?.users) this.users$.next(msg.users)
    })
   }
   getUsersOnline(){
    this.ws.sendMessage({action: 'users-online'})
   }
   getUsersAll(){
    this.ws.sendMessage({action: 'users-all'})
   }
   sendChat(chatMessage: string){
    this.ws.sendMessage({action: 'users-chat', data: {message: chatMessage}})
   }
}
