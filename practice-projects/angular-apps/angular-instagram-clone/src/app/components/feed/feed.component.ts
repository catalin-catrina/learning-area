import {
  Component,
  DoCheck,
  HostListener,
  inject,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { FeedService } from '../../services/feed.service';
import { Post } from '../../models/post.interface';
import { CommonModule } from '@angular/common';
import { AuthenticationService } from '../../services/authentication.service';
import { toObservable } from '@angular/core/rxjs-interop';
import { combineLatestWith, filter, Subscription, take } from 'rxjs';
import { EventBusService } from '../../services/event-bus.service';

@Component({
  selector: 'app-feed',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './feed.component.html',
  styleUrl: './feed.component.scss',
})
export class FeedComponent implements OnInit, OnDestroy, DoCheck {
  ngDoCheck(): void {
    // console.log('cachedPosts:', this.cachedPosts);
  }

  posts: Post[] = [];
  loading = false;
  private subscriptions: Subscription = new Subscription();

  private feedService = inject(FeedService);
  private authenticationService = inject(AuthenticationService);
  private eventBusService = inject(EventBusService);

  cachedPosts = this.feedService.cachedPosts;
  noMoreDataSignal = this.feedService.noreMoreDataSignal;
  lastVisibleSignal = this.feedService.lastVisibleSignal;

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

    this.subscriptions.add(
      this.eventBusService.userFollowed$.subscribe((userId: string) => {
        this.cachedPosts = [];
        this.lastVisibleSignal.set(null);
        this.loadMorePosts();
      })
    );
    this.subscriptions.add(
      this.eventBusService.userUnfollowed$.subscribe((userId: string) => {
        this.cachedPosts = [];
        this.lastVisibleSignal.set(null);
        this.loadMorePosts();
      })
    );
    this.subscriptions.add(
      this.eventBusService.userLoggedIn$.subscribe((user) => {})
    );
    this.subscriptions.add(
      this.eventBusService.userLoggedOut$.subscribe(() => {})
    );
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    const threshhold = 100;
    const position = window.innerHeight + window.scrollY;
    const height = document.body.offsetHeight;
    if (
      position > height - threshhold &&
      height > window.innerHeight &&
      !this.loading
    ) {
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
        return;
      } else {
        this.posts.push(...newPosts);
      }
    } catch (error) {
      console.error('Error loading posts:', error);
    } finally {
      this.loading = false;
    }
  }

  ngOnDestroy(): void {
    // this.subscriptions.unsubscribe();
  }
}
