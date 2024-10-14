import { computed, effect, inject, Injectable, signal } from '@angular/core';
import {
  getDownloadURL,
  listAll,
  ref,
  Storage,
  uploadBytesResumable,
} from '@angular/fire/storage';
import { AuthenticationService } from './authentication.service';
import { from, map, Observable, of, switchMap } from 'rxjs';
import { toObservable } from '@angular/core/rxjs-interop';
import { User } from '@angular/fire/auth';
import {
  addDoc,
  collection,
  collectionData,
  doc,
  Firestore,
  getDoc,
} from '@angular/fire/firestore';
import Post from '../models/post.interface';

@Injectable({
  providedIn: 'root',
})
export class PostsService {
  private storage = inject(Storage);
  private firestore = inject(Firestore);
  private auth = inject(AuthenticationService);

  userSignal = this.auth.getUser();
  user$ = toObservable(this.auth.getUser());

  posts$!: Observable<Post[]>;

  constructor() {
    this.getUserPosts();
  }

  getUserPostById(id: string): Promise<Post> {
    const docRef = doc(this.firestore, 'posts', id);
    return new Promise((resolve, reject) => {
      getDoc(docRef)
        .then((docSnap) => {
          if (docSnap.exists()) {
            resolve(docSnap.data() as Post);
          } else {
            reject(new Error('Document does not exist'));
          }
        })
        .catch(
          (error) => new Error('Failed to retrieve document', error.message)
        );
    });
  }

  getUserPosts() {
    const postsCollection = collection(this.firestore, 'posts');
    this.posts$ = collectionData(postsCollection, { idField: 'id' }).pipe(
      map((posts: Post[]) =>
        posts.map((post) => {
          return {
            ...post,
            createdAt: new Date(post.createdAt),
          };
        })
      )
    );
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

  // Getting posts images - Function Based
  // getUserPostsImages() {
  //   return this.user$.pipe(
  //     switchMap((user: User | null) => {
  //       if (user) {
  //         const filesRef = ref(this.storage, `users/${this.userSignal()?.uid}`);
  //         return from(listAll(filesRef)).pipe(
  //           switchMap((posts) => {
  //             const postsURLs = posts.items.map((post) => getDownloadURL(post));
  //             return Promise.all(postsURLs);
  //           })
  //         );
  //       } else {
  //         return of([]);
  //       }
  //     })
  //   );
  // }

  // Getting posts images - DECLARATIVE
  //   userPostsSignal = signal<string[] | []>([]);
  //
  //   constructor() {
  //     effect(() => {
  //       const user = this.userSignal();
  //
  //       if (user) {
  //         this.updateUserPostsSignal();
  //       }
  //     });
  //   }
  //
  //   updateUserPostsSignal() {
  //     const user = this.userSignal();
  //
  //     const filesRef = ref(this.storage, `users/${user?.uid}`);
  //     listAll(filesRef)
  //       .then((files) => {
  //         const filesUrls = files.items.map((file) => getDownloadURL(file));
  //         return Promise.all(filesUrls);
  //       })
  //       .then((urls) => {
  //         console.log('aici', urls);
  //         this.userPostsSignal.set(urls);
  //       })
  //       .catch((error) => {
  //         console.error(`Error getting files ${error}`);
  //       });
  //   }
}
