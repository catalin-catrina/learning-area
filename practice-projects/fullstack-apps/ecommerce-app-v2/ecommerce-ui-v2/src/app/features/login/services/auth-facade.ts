import { inject, Injectable, signal } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { HttpErrorService } from '../../../core/services/http-error.service';
import { catchError, Observable, of, tap } from 'rxjs';
import { UserDto } from '../../../domains/auth/models/user.dto';
import { AuthApi } from '../../../domains/auth/services/auth-api';
import { LoginRequest } from '../models/login-request.interface';
import { LoginResponseDto } from '../../../domains/auth/models/login-response.dto';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthFacade {
  private baseUrl = `${environment.apiUrl}`;

  user: UserDto | null = null;
  authenticated = signal(false);

  private authApi = inject(AuthApi);
  private readonly http = inject(HttpClient);
  private readonly httpError = inject(HttpErrorService);
  private readonly router = inject(Router);

  init() {
    const hasSession = localStorage.getItem('hasSession');
    if (!hasSession) {
      return of({});
    }

    return this.me().pipe(
      tap(() => {
        if (this.user) {
          this.authenticated.set(true);
        }
      }),
    );
  }

  me(): Observable<UserDto | {}> {
    return this.http.get<UserDto>(`${this.baseUrl}/profile`).pipe(
      tap((data: UserDto) => {
        this.user = data;
      }),
      catchError((err) => {
        this.httpError.formatError(err);
        return of({});
      }),
    );
  }

  login(loginReq: LoginRequest): Observable<LoginResponseDto | {}> {
    return this.authApi.login(loginReq).pipe(
      tap((data: LoginResponseDto) => {
        this.authenticated.set(true);
        this.user = data.payload;
        localStorage.setItem('hasSession', 'true');
        this.router.navigate(['/home']);
      }),
    );
  }

  logout() {
    return this.authApi.logout().pipe(
      tap(() => {
        this.authenticated.set(false);
        this.user = null;
        localStorage.removeItem('hasSession');
        this.router.navigate(['/login']);
      }),
    );
  }
}
