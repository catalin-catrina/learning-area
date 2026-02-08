import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { LoginRequest } from '../../../features/login/models/login-request.interface';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { LoginResponseDto } from '../models/login-response.dto';

@Injectable({
  providedIn: 'root',
})
export class AuthApi {
  private baseUrl = `${environment.apiUrl}/auth`;
  private readonly http = inject(HttpClient);

  login(loginRequest: LoginRequest): Observable<LoginResponseDto> {
    return this.http.post<LoginResponseDto>(
      `${this.baseUrl}/login`,
      loginRequest,
    );
  }

  refresh() {
    return this.http.post(`${this.baseUrl}/refresh`, null);
  }

  logout() {
    return this.http.post(`${this.baseUrl}/logout`, null);
  }
}
