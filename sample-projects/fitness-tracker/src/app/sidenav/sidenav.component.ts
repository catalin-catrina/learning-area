import {
  Component,
  EventEmitter,
  inject,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sidenav',
  standalone: true,
  imports: [
    MatListModule,
    MatIconModule,
    MatButtonModule,
    RouterLink,
    RouterLinkActive,
    CommonModule,
  ],
  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.css',
})
export class SidenavComponent implements OnInit, OnDestroy {
  @Input() sidenav: any;
  @Output() onBtnClicked = new EventEmitter();
  loginSub!: Subscription;
  isLoggedIn = false;

  authService = inject(AuthService);

  ngOnInit(): void {
    this.loginSub = this.authService.auth$.subscribe(
      (isLoggedIn) => (this.isLoggedIn = isLoggedIn)
    );
  }

  emitBtnClicked() {
    this.onBtnClicked.emit();
  }

  onLogout() {
    this.emitBtnClicked();
    this.authService.logout();
  }

  ngOnDestroy(): void {
    this.loginSub.unsubscribe();
  }
}
