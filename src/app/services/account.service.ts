import { Injectable } from '@angular/core';
import { Preferences } from '@capacitor/preferences';
import { AlertController } from '@ionic/angular';
import { ApiService } from './api.service';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  endpoint: string = 'accounts';
  constructor(
    private api: ApiService,
    private alertCtrl: AlertController,
    private auth: AuthenticationService
  ) {}

  async login(username: string, password: string): Promise<Object> {
    const result = { login_status: '', message: '' };

    this.api
      .doPost(`${this.endpoint}/login`, { username, password })
      .subscribe(async (res) => {
        // console.log(res);
        if (res.data.login_status === 'success') {
          await Preferences.set({ key: 'token', value: res.data.token });
          await Preferences.set({ key: 'user', value: username });
          this.alertCtrl
            .create({
              header: 'Notifikasi',
              subHeader: 'Berhasil Login!',
              buttons: [
                {
                  text: 'OK',
                  handler: () => location.reload(),
                },
              ],
            })
            .then((res) => res.present());
        } else {
          this.alertCtrl
            .create({
              header: 'Notifikasi',
              subHeader: 'Gagal Login!',
              buttons: ['OK'],
            })
            .then((res) => res.present());
        }
      });

    return result;
  }

  logout(): void {
    this.auth.isAuthenticated.next(false);
    Preferences.clear();
    location.reload();
  }
}
