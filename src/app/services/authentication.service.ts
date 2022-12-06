import { Injectable } from '@angular/core';
import { Preferences } from '@capacitor/preferences';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  isAuthenticated: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  token: string = '';

  constructor() {
    this.authenticateUser();
  }

  async authenticateUser() {
    const token = await Preferences.get({ key: 'token' });
    // console.log(token);

    if (token && token.value) {
      // console.log('set token: ', token.value);
      this.token = token.value;

      this.isAuthenticated.next(true);
      // console.log('authServ : ', this.isAuthenticated);
    } else {
      this.isAuthenticated.next(false);
    }
  }
}
