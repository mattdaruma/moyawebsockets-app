import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { WebSocketService } from '../websocket.service';

@Injectable({
  providedIn: 'root'
})
export class PicsService {
  public myPics$ = new BehaviorSubject<any | null>(null)
  public picUploadReady$ = new Subject<any>()
  public picUploadPart$ = new Subject<any>()
  public picUploadComplete$ = new Subject<any>()
  constructor(private ws: WebSocketService) { 
    this.ws.open$.subscribe(openMsg => {
      this.listPics()
      this.ws.received$.subscribe(msg => {
        if(msg?.myPics) {
          console.warn('MYPICS', msg.myPics)
          this.myPics$.next(msg.myPics)
        }
        if(msg?.picUploadReady){
          this.picUploadReady$.next(msg.picUploadReady)
        }
        if(msg?.picUploadPart){
          this.picUploadPart$.next(msg.picUploadPart)
        }
        if(msg.picUploadComplete){
          this.picUploadComplete$.next(msg.picUploadComplete)
        }
      })
    })
  }
  listPics(){
   this.ws.sendMessage({action: 'pics-list'})
  }
  beginUpload(fileName: string){
    //this.ws.sendMessage({action: 'pics-begin-upload', data: {fileName: fileName}})
    console.warn('😎😎😎Upload Ready', fileName)
    this.picUploadReady$.next({fileName})
  }
  uploadPart(fileName: string, index: number, chunk: ArrayBuffer){
    console.warn('😎😎😎Upload Part', fileName, index, chunk)
    this.picUploadPart$.next({fileName, index})
  }
  completeUpload(fileName: string){
    console.warn('😎😎😎Upload Complete', fileName)
    this.picUploadComplete$.next({fileName})
  }
}
