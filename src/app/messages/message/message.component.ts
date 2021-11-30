import { Component, OnInit } from '@angular/core';
import {HttpService} from "../../services/http.service";
import {ChatMessage} from "../../model/chat-message";

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit {

  constructor(private httpService: HttpService) { }

  ngOnInit(): void {
  }

  getMessage() {
    this.httpService.getChatMessage().subscribe(chatMessage =>{
      console.log(chatMessage.user);
    }, error => {
      console.log("Brak wiadomości: " + error);
    })
  }

  sendMessage() {
    const chatMessage: ChatMessage = ({
      value: 'Wiadomość z Angulara',
      user: 'Rafał',
      date: new Date().toLocaleString()
    })
    this.httpService.addChatMessage(chatMessage).subscribe(() =>{
      console.log("Wysłana wiadomość: " + chatMessage.value);
    })
  }
}
