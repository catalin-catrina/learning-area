import {
  Component,
  DoCheck,
  effect,
  HostListener,
  inject,
  OnInit,
} from '@angular/core';
import { FeedService } from '../../services/feed.service';
import { Post } from '../../models/post.interface';
import { CommonModule } from '@angular/common';
import { AuthenticationService } from '../../services/authentication.service';

@Component({
  selector: 'app-feed',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './feed.component.html',
  styleUrl: './feed.component.scss',
})
export class FeedComponent implements OnInit, DoCheck {
  ngDoCheck(): void {
    console.log('posts', this.posts);
  }
  posts: Post[] = [];
  loading = false;
  noMoreData = false;

  private feedService = inject(FeedService);
  private authenticationService = inject(AuthenticationService);

  private userSignal = this.authenticationService.getUser();

  ngOnInit(): void {
    this.loadMorePosts();
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    const threshhold = 100;
    const position = window.innerHeight + window.scrollY;
    const height = document.body.offsetHeight;

    if (position > height - threshhold && !this.loading && !this.noMoreData) {
      this.loadMorePosts();
    }
  }

  async loadMorePosts() {
    if (this.loading) return;

    this.loading = true;

    try {
      const newPosts = await this.feedService.fetchPosts();
      console.log('newPosts', newPosts);
      if (newPosts.length === 0) {
        this.noMoreData = true;
      } else {
        this.posts.push(...newPosts);
      }
    } catch (error) {
      console.error('Error loading posts:', error);
    } finally {
      this.loading = false;
    }
  }
}
