import { inject, Injectable } from '@angular/core';
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

@Injectable({
  providedIn: 'root',
})
export class CommentsService {
  firestore = inject(Firestore);

  writeCommentToFirestore(comment: string, postId: string, userId: string) {
    const commentsCollection = collection(this.firestore, 'comments');
    addDoc(commentsCollection, {
      comment: comment,
      postId: postId,
      userId: userId,
    });
  }

  getCommentsByPostId(postId: string) {
    const commentsCollection = collection(this.firestore, 'comments');
    const q = query(commentsCollection, where('postId', '==', postId));

    return new Promise<Comment[]>((resolve, reject) => {
      try {
        getDocs(q)
          .then((querySnap) => {
            let data: Comment[] = [];
            querySnap.forEach((doc) => {
              data.push(doc.data() as Comment);
            });
            resolve(data);
          })
          .catch((error) => reject(error));
      } catch (error) {
        reject(error);
      }
    });
  }
}
