import { effect, inject, Injectable, Signal, signal } from '@angular/core';
import {
  Auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  UserProfile,
} from '@angular/fire/auth';
import { doc, Firestore, getDoc, setDoc } from '@angular/fire/firestore';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  private _user = signal<UserProfile | null>(null);

  private auth = inject(Auth);
  private firestore = inject(Firestore);
  private router = inject(Router);

  constructor() {
    effect(() => {
      const user = this.getUser();
      if (user()) {
        this.router.navigate(['/home']);
      }
    });
  }

  getUser(): Signal<UserProfile | null> {
    return this._user;
  }

  initUserFromLocalStorage() {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      this._user.set(JSON.parse(savedUser));
    }
  }

  setUser(userData: UserProfile): void {
    this._user.set(userData);
    localStorage.setItem('user', JSON.stringify(userData));
  }

  signupUser(
    email: string,
    password: string,
    additionalData: { fullname: string; username: string }
  ) {
    createUserWithEmailAndPassword(this.auth, email, password)
      .then((userCredential) => {
        // logged in user
        const user = userCredential.user;

        // this gives us access to user's uid which is created when he registers, which we save into firestore
        // we create a new document with the uid of the registered user which will become the id of the document in which we'll save additional data about the user

        // create a document with the id user.uid into the 'users' collection
        const userDocRef = doc(this.firestore, 'users', user.uid);

        // write into that document
        setDoc(userDocRef, {
          uuid: user.uid,
          email: user.email,
          fullname: additionalData.fullname,
          displayName: additionalData.username,
          createdAt: new Date().toISOString(),
        });

        this.router.navigate(['/login']);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;

        console.log(`Error code: ${errorCode}, error message: ${errorMessage}`);
      });
  }

  login(email: string, password: string) {
    signInWithEmailAndPassword(this.auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;

        // get doc reference
        const userDocRef = doc(this.firestore, 'users', user.uid);

        // get data from that doc reference
        getDoc(userDocRef).then((docSnapshot) => {
          if (docSnapshot.exists()) {
            const userData = docSnapshot.data();
            this.setUser(userData);
          }
        });
      })
      .catch((error) => {
        console.log('Error loggin in: ', error.message);
      });
  }

  logout() {
    this.auth
      .signOut()
      .then(() => {
        localStorage.removeItem('user');
        this._user.set(null);
        this.router.navigate(['/login']);
      })
      .catch((error) => {
        console.log('Error logging out: ', error.message);
      });
  }
}
