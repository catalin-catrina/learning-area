import { computed, effect, inject, Injectable } from '@angular/core';
import { AuthenticationService } from './authentication.service';
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
export class FeedService {
  followedUsers!: string[];

  private authService = inject(AuthenticationService);
  private firestore = inject(Firestore);

  private loggedInUserSignal = this.authService.getUser();
  private loggedInUserIdSignal = computed(() => this.loggedInUserSignal()?.uid);

  constructor() {
    effect(() => {
      this.getFollowers(this.loggedInUserIdSignal());
    });
  }

  async getFollowers(userId: string | undefined) {
    try {
      if (userId) {
        const followCollection = collection(this.firestore, 'follow');
        const q = query(followCollection, where('followerId', '==', userId));
        const querySnapshop = await getDocs(q);
        this.followedUsers = querySnapshop.docs.map((doc) => {
          return doc.data()['followedId'];
        });
      }
    } catch (error) {
      console.error('Could not fetch followers', error);
    }
  }

  getPosts() {}
}
