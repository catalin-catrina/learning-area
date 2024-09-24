import { Component, inject } from '@angular/core';
import { AuthenticationService } from '../../services/authentication';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [MatButtonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  private auth = inject(AuthenticationService);

  logout() {
    this.auth.logout();
  }
}
