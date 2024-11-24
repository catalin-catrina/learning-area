import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { UserCredential } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root',
})
export class EventBusService {
  userFollowedSubject = new Subject<string>();
  userUnfollowedSubject = new Subject<string>();
  userLoggedInSubject = new Subject<UserCredential>();
  userLoggedOutSubject = new Subject<void>();

  userFollowed$ = this.userFollowedSubject.asObservable();
  userUnfollowed$ = this.userUnfollowedSubject.asObservable();
  userLoggedIn$ = this.userLoggedInSubject.asObservable();
  userLoggedOut$ = this.userLoggedOutSubject.asObservable();
}
