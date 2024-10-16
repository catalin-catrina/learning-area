import {
  Component,
  inject,
  Input,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { CommentsService } from '../../services/comments.service';
import Post from '../../models/post.interface';

@Component({
  selector: 'app-comments',
  standalone: true,
  imports: [],
  templateUrl: './comments.component.html',
  styleUrl: './comments.component.scss',
})
export class CommentsComponent implements OnChanges {
  @Input() post: Post | null = null;

  comments!: any;

  private commentsService = inject(CommentsService);

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['post'].currentValue) {
      this.comments = this.commentsService.getCommentsByPostId(this.post?.id);
    }
  }
}
