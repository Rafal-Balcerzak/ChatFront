import {Component, OnInit} from '@angular/core';
import {HttpService} from "../../services/http.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  constructor(private httpService: HttpService, private router: Router) {
  }

  navigateToChat() {
    this.router.navigateByUrl("/chat");
  }

  ngOnInit(): void {
  }

  setUserName(userName: string) {
    this.httpService.userName = userName;
    this.validateInput(userName);
  }

  validateInput(userName: string) {
    userName = userName.trim();
    if (userName === '' || userName === null || userName.length === 0) {
      alert("Username can not be empty");
      return false;
    } else {
      this.navigateToChat();
    }
  }
}
