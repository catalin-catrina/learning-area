import { computed, effect, inject, Injectable, signal } from '@angular/core';
import { AuthenticationService } from './authentication.service';
import {
  collection,
  DocumentData,
  FieldPath,
  Firestore,
  getDocs,
  limit,
  orderBy,
  query,
  QueryDocumentSnapshot,
  startAfter,
  where,
} from '@angular/fire/firestore';
import { Post } from '../models/post.interface';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FeedService {
  cachedPosts: Post[] = [];
  followedUsers!: string[];

  followedUsersSubject = new BehaviorSubject<string[] | null>(null);
  followedUsers$ = this.followedUsersSubject.asObservable();

  lastVisible: QueryDocumentSnapshot<DocumentData> | null = null;

  noreMoreDataSignal = signal<boolean>(false);

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
        const querySnapshot = await getDocs(q);
        this.followedUsers = querySnapshot.docs.map((doc) => {
          return doc.data()['followedId'];
        });

        this.followedUsersSubject.next(this.followedUsers);
      }
    } catch (error) {
      console.error('Could not fetch followers', error);
    }
  }

  async fetchPosts(): Promise<Post[]> {
    if (!this.followedUsers || this.followedUsers.length === 0) return [];
    const postsCollection = collection(this.firestore, 'posts');
    let queryRef;

    if (this.lastVisible) {
      queryRef = query(
        postsCollection,
        where('userId', 'in', this.followedUsers),
        orderBy('createdAt', 'desc'),
        startAfter(this.lastVisible),
        limit(10)
      );
    } else {
      queryRef = query(
        postsCollection,
        where('userId', 'in', this.followedUsers),
        orderBy('createdAt', 'desc'),
        limit(10)
      );
    }

    const querySnapshot = await getDocs(queryRef);

    if (querySnapshot.empty) {
      this.noreMoreDataSignal.set(true);
      return [];
    } else {
      this.noreMoreDataSignal.set(false);
      this.lastVisible =
        querySnapshot.docs[querySnapshot.docs.length - 1] || null;

      const posts = querySnapshot.docs.map((doc) => {
        console.log('post:', doc.data());
        return doc.data() as Post;
      });
      this.cachedPosts.push(...posts);

      return posts;
    }
  }
}
