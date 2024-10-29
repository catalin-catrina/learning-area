import { inject, Injectable } from '@angular/core';
import {
  getDownloadURL,
  ref,
  Storage,
  uploadBytesResumable,
} from '@angular/fire/storage';
import { AuthenticationService } from './authentication.service';
import { filter, from, map, Observable, of, switchMap } from 'rxjs';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import {
  addDoc,
  collection,
  doc,
  Firestore,
  getDoc,
  getDocs,
  query,
  where,
} from '@angular/fire/firestore';
import { Post } from '../models/post.interface';

@Injectable({
  providedIn: 'root',
})
export class PostsService {
  private storage = inject(Storage);
  private firestore = inject(Firestore);
  private auth = inject(AuthenticationService);

  userSignal = this.auth.getUser();
  user$ = toObservable(this.auth.getUser());

  postsSignal = toSignal(from(this.getUserPosts()));

  getUserPostById(id: string): Promise<Post> {
    const docRef = doc(this.firestore, 'posts', id);
    return new Promise((resolve, reject) => {
      getDoc(docRef)
        .then((docSnap) => {
          if (docSnap.exists()) {
            const postData = {
              ...docSnap.data(),
              createdAt: new Date(docSnap.data()['createdAt']),
            };
            resolve(postData as Post);
          } else {
            reject(new Error('Document does not exist'));
          }
        })
        .catch(
          (error) => new Error('Failed to retrieve document', error.message)
        );
    });
  }

  getUserPosts(): Observable<Post[]> {
    return this.user$.pipe(
      filter(Boolean),
      switchMap((user) => {
        const postsCollection = collection(this.firestore, 'posts');
        const q = query(postsCollection, where('userId', '==', user?.uid));

        return getDocs(q).then((querySnapshot) =>
          querySnapshot.docs.map(
            (doc) =>
              ({
                ...doc.data(),
                id: doc.id,
                createdAt: new Date(doc.data()['createdAt']),
              } as Post)
          )
        );
      })
    );
  }

  async getProfileUserPosts(id: string): Promise<Post[]> {
    const postsCollection = collection(this.firestore, 'posts');
    const q = query(postsCollection, where('userId', '==', id));
    const querySnapshot = await getDocs(q);
    const posts = querySnapshot.docs.map(
      (doc) =>
        ({
          ...doc.data(),
          id: doc.id,
          createdAt: new Date(doc.data()['createdAt']),
        } as Post)
    );
    return posts;
  }

  writePostToFirestore(post: string, imageUrl: any) {
    const postsCollection = collection(this.firestore, 'posts');
    addDoc(postsCollection, {
      userId: this.userSignal()?.uid,
      post: post,
      imageUrl: imageUrl,
      createdAt: new Date().toISOString(),
    });
  }

  writeImageToStorage(file: File) {
    const storageRef = ref(
      this.storage,
      `users/${this.userSignal()?.uid}/${file.name}`
    );
    const uploadTask = uploadBytesResumable(storageRef, file);
    return new Promise((resolve, reject) => {
      uploadTask.on(
        'state_changed',
        () => {},
        (error) => {
          reject(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadUrl) =>
            resolve(downloadUrl)
          );
        }
      );
    });
  }
}
