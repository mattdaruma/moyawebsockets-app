import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { WebSocketService } from '../websocket.service';

@Injectable({
  providedIn: 'root'
})
export class WorkService {
  myWork$ = new BehaviorSubject<any | null>(null)
  constructor(private ws: WebSocketService) {
    this.ws.open$.subscribe(openMsg => {
      this.getWorkGroups()
    })
    this.ws.received$.subscribe(msg => {
      if(msg?.myWork) {
        console.warn('MYWORK', msg.myWork)
        this.myWork$.next(msg.myWork)
      }
    })
   }
   getWorkGroups(){
    this.ws.sendMessage({action: 'work-groups-list'})
   }
}
