import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { LoginRequest } from '../../../features/auth/models/login-request';
import { LoginResponseDto } from './login-response.dto';
import { catchError, map, Observable, of, tap } from 'rxjs';
import { AccessTokenDto } from './access-token.dto';
import { AccessTokenStore } from '../state/access-token.store';
import { HttpErrorService } from '../../../core/services/http-error.service';
import { Result } from '../../../core/models/result.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthApiService {
  private baseUrl = `${environment.apiUrl}/auth/login`;

  private readonly http = inject(HttpClient);
  private readonly accessTokenStore = inject(AccessTokenStore);
  private httpErrorService = inject(HttpErrorService);

  login(req: LoginRequest): Observable<Result<LoginResponseDto>> {
    return this.http.post<LoginResponseDto>(`${this.baseUrl}/login`, req).pipe(
      tap((res) => {
        this.accessTokenStore.set(res.accessToken);
      }),
      map((res) => ({ data: res } as Result<LoginResponseDto>)),
      catchError((err) => {
        this.accessTokenStore.clear();
        return of({
          data: {},
          error: this.httpErrorService.formatError(err),
        } as Result<LoginResponseDto>);
      })
    );
  }

  refreshToken(): Observable<AccessTokenDto> {
    return this.http
      .post<AccessTokenDto>(`${this.baseUrl}/refresh`, null, {
        withCredentials: true, // Ensures cookies are sent with request
      })
      .pipe(
        tap((res) => {
          this.accessTokenStore.set(res.accessToken);
        })
      );
  }

  logout(): Observable<void> {
    return this.http
      .post<void>(`${this.baseUrl}/logout`, null)
      .pipe(tap(() => this.accessTokenStore.clear()));
  }
}
