import { Component, NgModule, OnInit } from '@angular/core';
import { NgForm, NgModel } from '@angular/forms';
import { IUserSettings } from '../data/user-settings';

@Component({
  selector: 'app-user-settings-form',
  templateUrl: './user-settings-form.component.html',
  styleUrls: ['./user-settings-form.component.css'],
})
export class UserSettingsFormComponent implements OnInit {
  originalUserSettings: IUserSettings = {
    name: null,
    emailOffers: null,
    interfaceStyle: null,
    subscriptionType: null,
    notes: null,
  };

  userSettings: IUserSettings = { ...this.originalUserSettings };

  constructor() {}

  ngOnInit(): void {}

  onBlur(field: NgModel) {
    console.log('In onBlur ', field.valid);
  }

  onSubmit(form: NgForm) {
    // form.valid is a bool
    console.log('In onSubmit: ', form.valid);
  }
}
