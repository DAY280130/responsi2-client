import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { promises } from 'dns';
import { from, Observable } from 'rxjs';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root',
})
export class ContactService {
  endpoint: string = 'contacts';
  constructor(private api: ApiService, private alertCtrl: AlertController) {}

  addContact(name: string, number: string): void {
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

  getContacts(): Observable<any> {
    return from(this.api.doGet(`${this.endpoint}/getall`, null));
  }

  getContact(id: string): Observable<any> {
    return from(this.api.doGet(`${this.endpoint}/get`, id));
  }

  editContact(id: string, name: string, number: string): void {
    this.api
      .doPut(`${this.endpoint}/edit`, { id, name, number })
      .subscribe((res) => {
        // console.log(res);
        if (res.data.update_status === 'success') {
          this.alertCtrl
            .create({
              header: 'Notifikasi',
              subHeader: 'Berhasil Mengubah Kontak!',
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
              subHeader: 'Gagal Mengubah Kontak!',
              buttons: ['OK'],
            })
            .then((res) => res.present());
        }
      });
  }

  deleteContact(id: string) {
    this.alertCtrl
      .create({
        header: 'Perhatian',
        subHeader: 'Yakin ingin menghapus kontak?',
        buttons: [
          {
            text: 'TIDAK',
          },
          {
            text: 'YAKIN',
            handler: () => {
              this.api
                .doDelete(`${this.endpoint}/remove`, { id })
                .subscribe((res) => {
                  if (res.data.delete_status === 'success') {
                    this.alertCtrl
                      .create({
                        header: 'Notifikasi',
                        subHeader: 'Berhasil Menghapus Kontak!',
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
                        subHeader: 'Gagal Menghapus Kontak!',
                        buttons: ['OK'],
                      })
                      .then((res) => res.present());
                  }
                });
            },
          },
        ],
      })
      .then((res) => res.present());
  }
}
