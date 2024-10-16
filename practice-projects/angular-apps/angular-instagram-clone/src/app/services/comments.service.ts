import { inject, Injectable } from '@angular/core';
import { addDoc, collection, Firestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root',
})
export class CommentsService {
  firestore = inject(Firestore);

  writeCommentToFirestore(comment: string, postId: string, userId: string) {
    const commentsCollection = collection(this.firestore, 'comments');
    addDoc(commentsCollection, { comment });
  }

  getCommentsByPostId(postId: string | undefined) {}
}
