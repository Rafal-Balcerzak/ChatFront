import {Component, ElementRef, OnInit, Renderer2, ViewChild} from '@angular/core';
import {HttpService} from "../../services/http.service";
import {ChatMessage} from "../../model/chat-message";

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit {

  @ViewChild("message")
  messageToSend: ElementRef;
  @ViewChild("response")
  response: ElementRef;
  userName: string = this.httpService.userName;

  constructor(private httpService: HttpService, private renderer: Renderer2) {
  }

  ngOnInit(): void {
    setInterval(() => {
      this.getMessageByUser(this.userName);
    }, 500);
  }

  getMessage() {
    this.httpService.getChatMessage().subscribe(chatMessage => {
      this.showMessage(chatMessage);
    }, error => {
      console.log("Brak wiadomości w kolejce: " + error);
    })
  }

  getMessageByUser(user: string) {
    this.httpService.getChatMessageByUser(user).subscribe(chatMessage => {
      this.showMessage(chatMessage);
    }, error => {
      console.log("Brak wiadomości w kolejce: " + error);
    })
  }

  sendMessage(message: string) {
    const chatMessage: ChatMessage = ({
      value: message,
      user: this.userName,
      date: new Date().toLocaleString()
    })
    this.httpService.addChatMessage(chatMessage).subscribe(() => {
      console.log("Wysłana wiadomość: " + chatMessage.value);
    }, error => {
      console.log("Błąd wysyłania wiadomości" + error);
    });
    this.clearMtS();
  }

  clearMtS() {
    this.messageToSend.nativeElement.value = '';
  }

  showMessage(chatMessage: ChatMessage) {
    const newResponseUser = this.renderer.createElement('a');
    const newResponseMessage = this.renderer.createElement('a');
    const newResponseDate = this.renderer.createElement('a');
    const newResponseBR = this.renderer.createElement('br');
    newResponseUser.innerHTML = chatMessage.user + ': ';
    newResponseMessage.innerHTML = chatMessage.value + ' ';
    newResponseDate.innerHTML = chatMessage.date;
    this.renderer.appendChild(this.response.nativeElement, newResponseUser);
    this.renderer.appendChild(this.response.nativeElement, newResponseMessage);
    this.renderer.appendChild(this.response.nativeElement, newResponseDate);
    this.renderer.appendChild(this.response.nativeElement, newResponseBR);
    this.renderer.setStyle(newResponseUser, 'font-style', 'oblique');
    this.renderer.setStyle(newResponseDate, 'font-style', 'oblique');
    this.renderer.setStyle(newResponseMessage, 'color', 'green');
    this.renderer.setStyle(newResponseDate, 'font-size', '8px');
  }

}
