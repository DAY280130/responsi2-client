import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root',
})
export class ContactService {
  endpoint: string = 'contacts';
  constructor(private api: ApiService, private alertCtrl: AlertController) {}

  addContact(name: string, number: string) {
    this.api
      .doPost(`${this.endpoint}/add`, { name, number })
      .subscribe((res) => {
        // console.log(res);
        if (res.data.create_status === 'success') {
          this.alertCtrl
            .create({
              header: 'Notifikasi',
              subHeader: 'Berhasil Menambah Kontak!',
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
              subHeader: 'Gagal Menambah Kontak!',
              buttons: ['OK'],
            })
            .then((res) => res.present());
        }
      });
  }
}
