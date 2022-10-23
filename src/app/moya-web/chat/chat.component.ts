import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { WebSocketService } from '../websocket.service';
import { ChatService } from './chat.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent {
  sidebarOpen = true
  chats: any[] = []
  chatInput = new FormControl('')
  constructor(public cs: ChatService) { 
    this.cs.usersChat$.subscribe(chatMessage => {
      if(this.chats.length > 50) this.chats.pop()
      this.chats.unshift(chatMessage)
    })
  }
  sendMessage(){
    if(!this.chatInput.value) return;
    this.cs.sendChat(this.chatInput.value!)
    this.chatInput.setValue('')
  }
}
