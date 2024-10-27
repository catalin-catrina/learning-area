import {
  Component,
  inject,
  Input,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { PostsService } from '../../services/posts.service';
import { AsyncPipe, CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { months } from '../../constants/constants';
import { Observable } from 'rxjs';
import { Post } from '../../models/post.interface';

@Component({
  selector: 'app-posts',
  standalone: true,
  imports: [CommonModule, AsyncPipe, RouterLink, RouterLinkActive],
  templateUrl: './posts.component.html',
  styleUrl: './posts.component.scss',
})
export class PostsComponent implements OnChanges {
  @Input() userId!: string;

  months = months;

  private postsService = inject(PostsService);

  // currentUserPosts$!: Observable<Post[]>;
  // profileUserPosts$!: Observable<Post[]>;

  posts$!: Observable<Post[]> | Promise<Post[]>;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['userId']) {
      if (this.userId) {
        console.log('1', this.userId);
        this.posts$ = this.postsService.getProfileUserPosts(this.userId);
      } else {
        console.log('2', this.userId);
        this.posts$ = this.postsService.getUserPosts();
      }
    }
  }
}
