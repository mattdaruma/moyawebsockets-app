import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ApiService } from './api.service';
import { MoyaWebService } from './moya-web.service';

@Component({
  selector: 'app-moya-web',
  templateUrl: './moya-web.component.html',
  styleUrls: ['./moya-web.component.scss']
})
export class MoyaWebComponent  {
  sidebarOpen = true
  chats: any[] = []
  chatInput = new FormControl('')
  constructor(public moya: MoyaWebService) { 
    this.moya.usersChat$.subscribe(chatMessage => {
      if(this.chats.length > 99) this.chats.pop()
      this.chats.unshift(chatMessage)
    })
  }
  sendMessage(){
    if(!this.chatInput.value) return;
    this.moya.sendChat(this.chatInput.value!)
    this.chatInput.setValue('')
  }

}
