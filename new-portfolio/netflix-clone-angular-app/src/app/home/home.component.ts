import { Component } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  user = JSON.parse(sessionStorage.getItem('user')!);
  constructor(private authService: AuthService) {}

  signOut() {
    this.authService.signOut();
  }
}
