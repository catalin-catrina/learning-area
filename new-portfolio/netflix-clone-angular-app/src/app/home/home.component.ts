import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { HeaderComponent } from '../header/header.component';

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  imports: [HeaderComponent],
})
export class HomeComponent {
  user = JSON.parse(sessionStorage.getItem('user')!);
  constructor(private authService: AuthService) {}

  signOut() {
    this.authService.signOut();
  }
}
