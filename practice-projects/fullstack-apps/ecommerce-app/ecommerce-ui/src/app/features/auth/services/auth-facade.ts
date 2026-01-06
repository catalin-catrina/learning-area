import { inject, Injectable, signal } from '@angular/core';
import { UserDto } from '../../../domains/auth/data-access/user.dto';
import { AuthApiService } from '../../../domains/auth/data-access/auth-api.service';
import { catchError, tap } from 'rxjs';
import { AccessTokenStore } from '../../../domains/auth/state/access-token.store';

@Injectable({ providedIn: 'root' })
export class AuthFacade {
  authenticated = signal(false);
  user: UserDto | null = null;
  loading = false;

  private readonly authApiService = inject(AuthApiService);
  private readonly accessTokenStore = inject(AccessTokenStore);

  init() {
    this.loading = true;

    this.authApiService.refreshToken().pipe(
      tap(() => this.authenticated.set(true)),
      catchError((err) => {
        this.authenticated.set(false);
        throw err;
      })
    );
  }

  login() {}

  logout() {}
}
