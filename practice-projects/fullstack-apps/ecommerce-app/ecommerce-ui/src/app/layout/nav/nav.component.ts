import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthFacade } from '../../features/auth/services/auth-facade';

@Component({
  standalone: true,
  selector: 'app-nav',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.scss',
})
export class NavComponent {
  private readonly authService = inject(AuthFacade);

  isAuth = this.authService.authenticated;
}
