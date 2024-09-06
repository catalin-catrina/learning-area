import { inject, Injectable } from '@angular/core';
import Auth from '../models/auth.model';
import User from '../models/user.model';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private user: User | undefined;

  private authSubject = new BehaviorSubject<boolean>(false);
  readonly auth$ = this.authSubject.asObservable();

  router = inject(Router);

  getUser() {
    return { ...this.user };
  }

  isAuth() {
    return this.user != undefined;
  }

  register(auth: Auth) {
    this.user = {
      userId: Math.round(Math.random() * 10000).toString(),
      email: auth.email,
    };

    this.authSubject.next(true);
    this.router.navigate(['/training']);
  }

  login(auth: Auth) {
    this.user = {
      userId: Math.round(Math.random() * 10000).toString(),
      email: auth.email,
    };

    this.authSubject.next(true);
    this.router.navigate(['training']);
  }

  logout() {
    this.user = undefined;
    this.authSubject.next(false);
    this.router.navigate(['/login']);
  }
}
