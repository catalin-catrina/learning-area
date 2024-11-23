import { Component, HostListener, inject, OnInit } from '@angular/core';
import { FeedService } from '../../services/feed.service';
import { Post } from '../../models/post.interface';
import { CommonModule } from '@angular/common';
import { AuthenticationService } from '../../services/authentication.service';
import { toObservable } from '@angular/core/rxjs-interop';
import { combineLatestWith, filter, take } from 'rxjs';

@Component({
  selector: 'app-feed',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './feed.component.html',
  styleUrl: './feed.component.scss',
})
export class FeedComponent implements OnInit {
  posts: Post[] = [];
  loading = false;
  noMoreData = false;

  private feedService = inject(FeedService);
  private authenticationService = inject(AuthenticationService);

  private userSignal = this.authenticationService.getUser();
  private user$ = toObservable(this.userSignal);
  private followedUsers$ = this.feedService.followedUsers$;

  ngOnInit(): void {
    this.user$
      .pipe(
        filter(Boolean),
        combineLatestWith(this.followedUsers$.pipe(filter(Boolean)))
      )
      .pipe(take(1))
      .subscribe(([user, followedUsers]) => {
        this.loadMorePosts();
      });
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    const threshhold = 100;
    const position = window.innerHeight + window.scrollY;
    const height = document.body.offsetHeight;
    console.log('window.innerHeight', window.innerHeight);
    console.log('window.scrollY', window.scrollY);
    console.log('position', position);
    console.log('height', height);
    console.log('treshhold', threshhold);
    if (
      position > height - threshhold &&
      height > window.innerHeight &&
      !this.loading &&
      !this.noMoreData
    ) {
      console.log('position', position);
      console.log('height', height);
      console.log('treshhold', threshhold);
      this.loadMorePosts();
    }
  }

  async loadMorePosts() {
    if (this.loading) return;

    this.loading = true;

    try {
      const newPosts = await this.feedService.fetchPosts();
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
