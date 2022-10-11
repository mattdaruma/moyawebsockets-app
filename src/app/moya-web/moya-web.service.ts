import { Injectable } from '@angular/core';
import { BehaviorSubject, first, ReplaySubject, Subject } from 'rxjs';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class MoyaWebService {
  public usersOnline$ = new Subject<any[]>()
  public usersChat$ = new Subject<string>()
  public usersMe$ = new BehaviorSubject<any | null>(null)
  public users$ = new Subject<any[]>()

  constructor(private api: ApiService) {
    this.api.open$.pipe(first()).subscribe(openMsg => {
      this.getUsersMe()
      this.getUsersOnline()
      this.getUsersAll()
    })
    this.api.received$.subscribe(msg => {
      console.warn('MOYA Message Received', JSON.stringify(msg, null, 2))
      if(msg?.usersOnline) this.usersOnline$.next(msg.usersOnline)
      if(msg?.usersChat) this.usersChat$.next(msg.usersChat)
      if(msg?.usersMe) this.usersMe$.next(msg.usersMe)
      if(msg?.users) this.users$.next(msg.users)
    })
   }
   getUsersMe(){
    this.api.sendMessage({action: 'users-me'})
   }
   getUsersOnline(){
    this.api.sendMessage({action: 'users-online'})
   }
   getUsersAll(){
    this.api.sendMessage({action: 'users-all'})
   }
   sendChat(chatMessage: string){
    this.api.sendMessage({action: 'users-chat', data: {message: chatMessage}})
   }
}
