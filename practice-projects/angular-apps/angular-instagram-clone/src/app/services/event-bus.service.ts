import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { UserCredential } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root',
})
export class EventBusService {
  private userFollowedSubject = new Subject<string>();
  private userUnfollowedSubject = new Subject<string>();
  private userLoggedInSubject = new Subject<UserCredential>();
  private userLoggedOutSubject = new Subject<void>();

  readonly userFollowed$ = this.userFollowedSubject.asObservable();
  readonly userUnfollowed$ = this.userUnfollowedSubject.asObservable();
  readonly userLoggedIn$ = this.userLoggedInSubject.asObservable();
  readonly userLoggedOut$ = this.userLoggedOutSubject.asObservable();

  emitUserFollowed(followedId: string) {
    this.userFollowedSubject.next(followedId);
  }
  emitUserUnfollowed(followedId: string) {
    this.userUnfollowedSubject.next(followedId);
  }
  emitUserLoggedIn(user: UserCredential) {
    this.userLoggedInSubject.next(user);
  }
  emitUserLoggedOut() {
    this.userLoggedOutSubject.next();
  }
}
