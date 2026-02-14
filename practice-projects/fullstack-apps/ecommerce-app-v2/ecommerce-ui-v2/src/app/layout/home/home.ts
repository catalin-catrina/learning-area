import { Component, inject } from '@angular/core';
import { AuthFacade } from '../../features/login/services/auth-facade';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {
  private readonly authFacade = inject(AuthFacade);

  user = this.authFacade.user;
  auth = this.authFacade.authenticated;
}
