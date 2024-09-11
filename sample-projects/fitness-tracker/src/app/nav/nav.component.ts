import { Component, EventEmitter, inject, Output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [
    MatToolbarModule,
    MatIconModule,
    RouterLink,
    RouterLinkActive,
    CommonModule,
  ],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css',
})
export class NavComponent {
  @Output() onBtnClicked = new EventEmitter();

  authService = inject(AuthService);

  isLoggedIn!: boolean;

  ngOnInit(): void {
    this.authService.isAuth.subscribe((isAuth) => (this.isLoggedIn = isAuth));
  }

  emitBtnClicked() {
    this.onBtnClicked.emit();
  }

  onLogout() {
    this.authService.logout();
  }
}
