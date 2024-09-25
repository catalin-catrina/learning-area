import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { AuthenticationService } from '../../services/authentication';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [MatButtonModule, RouterLink, RouterLinkActive],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
})
export class SidebarComponent {
  private auth = inject(AuthenticationService);

  logout() {
    this.auth.logout();
  }
}
