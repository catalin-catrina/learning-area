import { CommonModule } from '@angular/common';
import {
  Component,
  computed,
  inject,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { User } from '../../models/user.interface';
import { ProfileService } from '../../services/profile.service';
import { FollowService } from '../../services/follow.service';
import { AuthenticationService } from '../../services/authentication.service';

@Component({
  selector: 'app-profile-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './profile-header.component.html',
  styleUrl: './profile-header.component.scss',
})
export class ProfileHeaderComponent implements OnChanges {
  @Input() profileUserId!: string | null;
  @Input() isCurrentUser!: boolean;

  user!: User | null;
  isFollowing!: Boolean;

  private profileService = inject(ProfileService);
  private followService = inject(FollowService);
  private authService = inject(AuthenticationService);

  loggedInUserSignal = this.authService.getUser();
  loggedInUserIdSignal = computed(() => this.loggedInUserSignal()?.uid);

  ngOnChanges(changes: SimpleChanges): void {
    this.profileService.fetchUserById(this.profileUserId).then((user) => {
      this.user = user;
    });

    this.followService
      .isFollowing(this.loggedInUserIdSignal(), this.profileUserId)
      .then((isFollowing) => {
        this.isFollowing = isFollowing;
      });
  }

  followUser(followerId: string | undefined, followedId: string | null) {
    if (followerId && followedId) {
      this.followService.followUser(followerId, followedId);
    }
  }

  unfollowUser(followerId: string | undefined, followedId: string | null) {
    if (followerId && followedId) {
      this.followService.unfollowUser(followerId, followedId);
    }
  }
}
