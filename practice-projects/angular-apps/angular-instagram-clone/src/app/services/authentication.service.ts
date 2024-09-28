import { inject, Injectable, Signal, signal } from '@angular/core';
import {
  Auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  User,
  user,
} from '@angular/fire/auth';
import { doc, Firestore, getDoc, setDoc } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  private _user = signal<User | null>(null);

  private auth = inject(Auth);
  private firestore = inject(Firestore);
  private router = inject(Router);

  private user$ = user(this.auth);

  constructor() {
    this.trackUser();
  }

  async trackUser() {
    try {
      const currentUser = (await firstValueFrom(this.user$)) as User;
      this.setUser(currentUser);
    } catch (error) {
      console.log('Error fetching user:', error);
    }
  }

  getUser(): Signal<User | null> {
    return this._user;
  }

  setUser(userData: User): void {
    this._user.set(userData);
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
          uid: user.uid,
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
        this.setUser(user);

        // get current logged in user by looking for his uid in firestore, and save it in a signal
        // stopped needing this functionality since I just save the current logged in user in the signal now, instead of getting his data from firestore and saving that instead
        // get doc reference
        // const userDocRef = doc(this.firestore, 'users', user.uid);

        // get data from that doc reference
        // getDoc(userDocRef).then((docSnapshot) => {
        //   if (docSnapshot.exists()) {
        //     const userData = docSnapshot.data();
        //   }
        // });

        this.router.navigate(['/home']);
      })
      .catch((error) => {
        console.log('Error loggin in: ', error.message);
      });
  }

  logout() {
    this.auth
      .signOut()
      .then(() => {
        this._user.set(null);
        this.router.navigate(['/login']);
      })
      .catch((error) => {
        console.log('Error logging out: ', error.message);
      });
  }
}
