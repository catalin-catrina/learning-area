import { inject, Injectable, signal } from '@angular/core';
import { UserDto } from '../../../domains/auth/data-access/user.dto';
import { AuthApiService } from '../../../domains/auth/data-access/auth-api.service';
import { catchError, finalize, Observable, of, tap } from 'rxjs';
import { LoginRequest } from '../models/login-request';
import { LoginResponseDto } from '../../../domains/auth/data-access/login-response.dto';
import { Result } from '../../../core/models/result.interface';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthFacade {
  authenticated = signal(false);
  loading = signal(false);
  user: UserDto | null = null;

  private readonly authApiService = inject(AuthApiService);
  private readonly router = inject(Router);

  init() {
    this.loading.set(true);

    return this.authApiService.refreshToken().pipe(
      tap(() => this.authenticated.set(true)),
      catchError((err) => {
        this.authenticated.set(false);
        return of(err);
      }),
      finalize(() => this.loading.set(false)),
    );
  }

  login(req: LoginRequest): Observable<Result<LoginResponseDto>> {
    return this.authApiService.login(req).pipe(
      tap((res) => {
        if (res.data) {
          this.user = res.data.payload;
        }
        this.authenticated.set(true);
      }),
    );
  }

  logout(): Observable<void> {
    return this.authApiService.logout().pipe(
      tap(() => {
        this.user = null;
        this.authenticated.set(false);
        // Redirect to login after logout
        this.router.navigate(['/login']);
      }),
    );
  }
}
