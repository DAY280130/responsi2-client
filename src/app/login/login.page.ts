import { Component, OnInit } from '@angular/core';
import { AccountService } from '../services/account.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  username: string = '';
  password: string = '';

  constructor(private acc: AccountService) {}

  login() {
    // console.log(this.username, this.password);
    this.acc.login(this.username, this.password);
  }
}
