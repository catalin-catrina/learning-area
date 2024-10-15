import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CommentsService {
  writeCommentToFirestore(comment: string) {}

  getCommentsBy(postId: string) {}
}
