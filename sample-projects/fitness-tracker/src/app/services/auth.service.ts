import { effect, inject, Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
import {
  Auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  user,
} from '@angular/fire/auth';

import Login from '../models/login.model';
import { toSignal } from '@angular/core/rxjs-interop';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private auth = inject(Auth);
  private router = inject(Router);

  private user$ = user(this.auth);
  userSignal = toSignal(this.user$);

  isAuth = new BehaviorSubject<boolean>(false);

  constructor() {
    effect(() => {
      if (this.userSignal()) {
        this.router.navigate(['/training']);
        this.isAuth.next(true);
      } else {
        this.router.navigate(['/login']);
        this.isAuth.next(false);
      }
    });
  }

  register(user: Login) {
    createUserWithEmailAndPassword(this.auth, user.email, user.password).then(
      (userDetails) => {}
    );
  }

  login(user: Login) {
    signInWithEmailAndPassword(this.auth, user.email, user.password).then(
      (userDetails) => {}
    );
  }

  logout() {
    signOut(this.auth);
  }
}
