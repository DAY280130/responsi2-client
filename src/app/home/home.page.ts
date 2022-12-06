import { Component, OnInit } from '@angular/core';
import { Preferences } from '@capacitor/preferences';
import { AccountService } from '../services/account.service';
import { ContactService } from '../services/contact.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  user: string = '';
  isModalOpen: boolean = false;
  id: string = '';
  name: string = '';
  number: string = '';
  mode: string = '';
  contacts: any[] = [];

  constructor(private acc: AccountService, private cont: ContactService) {}

  async ngOnInit(): Promise<void> {
    this.user = (await Preferences.get({ key: 'user' })).value || '';
    this.cont.getContacts().subscribe((res) => {
      this.contacts = res.data.contacts;
      console.log(this.contacts);
    });
  }

  logout() {
    this.acc.logout();
  }

  async openModal(mode: string, id: string) {
    this.mode = mode;
    this.isModalOpen = true;
    if (mode === 'edit') {
      this.cont.getContact(id).subscribe((res) => {
        this.id = res.data.contact.id;
        this.name = res.data.contact.name;
        this.number = res.data.contact.number;
      });
    }
  }

  closeModal() {
    this.isModalOpen = false;
    this.name = '';
    this.number = '';
  }

  addContact() {
    this.cont.addContact(this.name, this.number);
  }

  submit() {
    if (this.mode == 'add') {
      this.addContact();
    } else {
      this.editContact(this.id);
    }
  }

  editContact(id: string) {
    this.cont.editContact(id, this.name, this.number);
  }

  deleteContact(id: string) {
    this.cont.deleteContact(id);
  }
}
