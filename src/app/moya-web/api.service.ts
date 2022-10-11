import { Injectable } from '@angular/core';
import { webSocket, WebSocketSubject, WebSocketSubjectConfig } from 'rxjs/webSocket'
import { NextObserver, Observable, Subject } from 'rxjs'
import { AuthService } from '../auth/auth.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  public open$ = new Subject<any>()
  public closing$ = new Subject<any>()
  public closed$ = new Subject<any>()
  public received$ = new Subject<any>()
  private _accessToken: string | null = null
  private mySocket: WebSocketSubject<any> | null = null;
  private serializer = (value: any)=>{
    return JSON.stringify(value)
  }
  private deserializer = (e: MessageEvent<any>)=> {
    return JSON.parse(e.data)
  }
  constructor(private auth: AuthService) {
    this.auth.accessToken$.subscribe(accessToken => {
      this._accessToken = accessToken
    })
    this.auth.authenticated$.subscribe(amAuthenticated => {
      if(!amAuthenticated) return
      if(this.mySocket === null){
        this.mySocket = this.generateWebSocket()
        this.mySocket.subscribe({
          next: msg => this.received$.next(msg),
          error: err => console.error('WEBSOCKET Error', JSON.stringify(err, null, 2)),
          complete: () => console.warn('WEBSOCKET SUBSCRIPTION COMPLETE')
        })
      }
    })
    this.open$.subscribe(msg => {
      console.warn('WEBSOCKET Open', JSON.stringify(msg, null, 2))
    })
    this.closing$.subscribe(msg => {
      console.warn('WEBSOCKET Closing', JSON.stringify(msg, null, 2))
    })
    this.closed$.subscribe(msg => {
      console.warn('WEBSOCKET Closed', JSON.stringify(msg, null, 2))
    })
   }
   sendMessage(message: any){
    console.warn('WEBSOCKET Sending', message)
    this.mySocket?.next(message)
   }
   private generateWebSocket(){
    console.warn('WEBSOCKET Connecting')
    return webSocket({
      url: `wss://${environment.apiGateway.domain}/${environment.apiGateway.stage}?Authorization=${this._accessToken}`,
      openObserver: this.open$,
      closingObserver: this.closing$,
      closeObserver: this.closed$,
      serializer: this.serializer,
      deserializer: this.deserializer
    } as WebSocketSubjectConfig<any>)
   }
}
