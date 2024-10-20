import { inject, Injectable } from '@angular/core';
import {
  collection,
  Firestore,
  getDocs,
  query,
  where,
} from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root',
})
export class UserSearchService {
  private firestore = inject(Firestore);

  async searchUsers(name: string) {
    const usersCollection = collection(this.firestore, 'users');
    const q = query(usersCollection, where('fullname', '==', name));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map((doc) => doc.data());
  }
}
