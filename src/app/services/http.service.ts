import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {ChatMessage} from "../model/chat-message";

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient) {
  }

  /*** Pobranie wiadomości ***/
  getChatMessage(): Observable<ChatMessage> {
    return this.http.get<ChatMessage>('http://localhost:8080/receiveMessage');
  }

  /*** Wysłanie wiadomości ***/
  addChatMessage(chatMessage: ChatMessage): Observable<ChatMessage>{
    return this.http.post<ChatMessage>('http://localhost:8080/addMessage', chatMessage);
  }
}
