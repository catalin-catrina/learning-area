import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-header',
  standalone: true,
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
  imports: [CommonModule],
})
export class HeaderComponent {
  constructor(private authService: AuthService) {}
  @Input() userImg: string = '';

  navList = [
    'Home',
    'TV Shows',
    'News & Popular',
    'My List',
    'Browse By Language',
  ];

  signOut() {
    this.authService.signOut();
  }
}
