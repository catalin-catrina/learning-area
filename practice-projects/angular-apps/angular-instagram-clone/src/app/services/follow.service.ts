import { inject, Injectable } from '@angular/core';
import {
  collection,
  deleteDoc,
  doc,
  Firestore,
  getDocs,
  query,
  serverTimestamp,
  setDoc,
  Timestamp,
  where,
} from '@angular/fire/firestore';
import { Follow } from '../models/follow.interface';

@Injectable({
  providedIn: 'root',
})
export class FollowService {
  private firestore = inject(Firestore);

  async followUser(followerId: string, followedId: string) {
    const followCollection = collection(this.firestore, 'follow');
    const followId = `${followerId}_${followedId}`;
    const followDocRef = doc(followCollection, followId);
    const data: Follow = {
      followerId,
      followedId,
      followedAt: serverTimestamp(),
    };
    await setDoc(followDocRef, data);
  }

  async unfollowUser(followerId: string, followedId: string) {
    const followCollection = collection(this.firestore, 'follow');
    const followId = `${followerId}_${followedId}`;
    const followDocRef = doc(followCollection, followId);
    await deleteDoc(followDocRef);
  }

  async isFollowing(
    followerId: string | undefined,
    followedId: string | null
  ): Promise<Boolean> {
    try {
      if (followedId && followerId && followedId !== followerId) {
        const followCollection = collection(this.firestore, 'follow');
        const q = query(
          followCollection,
          where('followerId', '==', followerId),
          where('followedId', '==', followedId)
        );
        const isFollowing = (await getDocs(q)).empty === false;
        console.log('aici', isFollowing);
        return isFollowing;
      } else {
        return false;
      }
    } catch (error) {
      console.error('Error fetching following data', error);
      throw new Error('Error fetching following data');
    }
  }

  async getFollowers(userId: string): Promise<Follow[]> {
    const followCollection = collection(this.firestore, 'follow');
    const q = query(followCollection, where('followedId', '==', userId));
    const querySnapshot = await getDocs(q);
    const followers = querySnapshot.docs.map((doc) => doc.data() as Follow);
    return followers;
  }

  async getFollowing(userId: string): Promise<Follow[]> {
    const followCollection = collection(this.firestore, 'follow');
    const q = query(followCollection, where('followerId', '==', userId));
    const querySnapshot = await getDocs(q);
    const followed = querySnapshot.docs.map((doc) => doc.data() as Follow);
    return followed;
  }
}
