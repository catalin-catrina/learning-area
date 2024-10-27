import { Component, computed, inject, OnInit } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { PostsComponent } from '../posts/posts.component';
import { ActivatedRoute } from '@angular/router';
import { AuthenticationService } from '../../services/authentication.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [MatTabsModule, CommonModule, PostsComponent],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
})
export class ProfileComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private auth = inject(AuthenticationService);

  currentUserIdSignal = computed(() => this.auth.getUser()()?.uid);
  profileUserId!: string;

  isCurrentUser!: boolean;

  ngOnInit(): void {
    this.route.paramMap.subscribe((data) => {
      const userId = data.get('id');
      if (this.currentUserIdSignal() === userId) {
        this.isCurrentUser = true;
      } else {
        this.profileUserId = userId ?? '';
        this.isCurrentUser = false;
      }
    });
  }
}
