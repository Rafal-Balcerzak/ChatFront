import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {ChatMessage} from "../model/chat-message";

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  userName: string;

  constructor(private http: HttpClient) {
  }

  /*** Pobranie wiadomości ***/
  getChatMessage(): Observable<ChatMessage> {
    return this.http.get<ChatMessage>('http://localhost:8080/receiveMessage');
  }

  /*** Pobranie wiadomości po Userze ***/
  getChatMessageByUser(user: string): Observable<ChatMessage>{
    const param = new HttpParams().set('user', user);
    return this.http.get<ChatMessage>('http://localhost:8080/receiveMessage',{params: param});
  }

  /*** Wysłanie wiadomości ***/
  addChatMessage(chatMessage: ChatMessage): Observable<ChatMessage>{
    return this.http.post<ChatMessage>('http://localhost:8080/addMessage', chatMessage);
  }
}
