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

import { toSignal } from '@angular/core/rxjs-interop';

import Login from '../models/login.model';
import { StateService } from './state.service';
import { SnackbarService } from './snackbar.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private auth = inject(Auth);
  private router = inject(Router);
  private snackBar = inject(SnackbarService);
  private state = inject(StateService);

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
    this.state.loginLoadingSubject.next(true);

    createUserWithEmailAndPassword(this.auth, user.email, user.password)
      .then((userDetails) => {
        this.state.loginLoadingSubject.next(false);
      })
      .catch((error) => {
        this.state.loginLoadingSubject.next(false);
        this.snackBar.displaySnackBar(error.message, undefined, 2000);
      });
  }

  login(user: Login) {
    this.state.loginLoadingSubject.next(true);

    signInWithEmailAndPassword(this.auth, user.email, user.password)
      .then((userDetails) => {
        this.state.loginLoadingSubject.next(false);
      })
      .catch((error) => {
        this.state.loginLoadingSubject.next(false);
        this.snackBar.displaySnackBar(error.message, undefined, 2000);
      });
  }

  logout() {
    signOut(this.auth);
  }
}
