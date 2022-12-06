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
  name: string = '';
  number: string = '';

  constructor(private acc: AccountService, private cont: ContactService) {}

  async ngOnInit(): Promise<void> {
    this.user = (await Preferences.get({ key: 'user' })).value || '';
  }

  logout() {
    this.acc.logout();
  }

  openModal(mode: string) {
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
    this.name = '';
    this.number = '';
  }

  addContact() {
    this.cont.addContact(this.name, this.number);
  }
}
