import { inject, Injectable } from '@angular/core';
import { collection, doc, Firestore, getDoc } from '@angular/fire/firestore';
import { User } from '../models/user.interface';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  private firestore = inject(Firestore);

  async fetchUserById(id: string | null): Promise<User | null> {
    try {
      if (id) {
        const docRef = doc(this.firestore, 'users', id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          return docSnap.data() as User;
        } else {
          return null;
        }
      } else {
        return null;
      }
    } catch (error) {
      console.error('Could not find user', error);
      throw new Error('An unexpected error occured while fetching the user');
    }
  }
}
