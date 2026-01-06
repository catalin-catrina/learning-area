import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserDto } from '../../auth/data-access/user.dto';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class UserApiService {
  profileUrl = `${environment.apiUrl}/users/profile`;

  private readonly http = inject(HttpClient);

  getMe(): Observable<UserDto> {
    return this.http.get<UserDto>(this.profileUrl);
  }

  updateMe() {}

  getById() {}
}
