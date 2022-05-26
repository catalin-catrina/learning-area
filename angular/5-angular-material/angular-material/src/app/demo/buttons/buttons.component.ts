import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-buttons',
  template: `
    <button mat-button><mat-icon>home</mat-icon> Go to home</button>
  `,
  styles: [],
})
export class ButtonsComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
