import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-sidenav',
  standalone: true,
  imports: [
    MatListModule,
    MatIconModule,
    MatButtonModule,
    RouterLink,
    RouterLinkActive,
  ],
  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.css',
})
export class SidenavComponent {
  @Input() sidenav: any;
  @Output() onMenuClicked = new EventEmitter();

  emitMenuClicked() {
    this.onMenuClicked.emit();
  }
}
