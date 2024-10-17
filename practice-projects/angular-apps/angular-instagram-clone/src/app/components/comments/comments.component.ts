import {
  Component,
  inject,
  Input,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { CommentsService } from '../../services/comments.service';
import Post from '../../models/post.interface';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-comments',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './comments.component.html',
  styleUrl: './comments.component.scss',
})
export class CommentsComponent implements OnChanges {
  @Input() post: Post | null = null;

  comments!: Comment[];

  private commentsService = inject(CommentsService);

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['post'].currentValue && this.post && this.post.id) {
      this.commentsService
        .getCommentsByPostId(this.post.id)
        .then((comments: Comment[]) => {
          console.log(comments);
          this.comments = comments;
        });
    }
  }
}
