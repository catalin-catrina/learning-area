import {
  Component,
  EventEmitter,
  inject,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../services/auth.service';
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
export class SidenavComponent implements OnInit {
  @Input() sidenav: any;
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
    this.emitBtnClicked();
    this.authService.logout();
  }
}
