import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-contactmanager-app',
  template: `
    <p>
      <app-side-nav></app-side-nav>
    </p>
  `,
  styles: [],
})
export class ContactmanagerAppComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
