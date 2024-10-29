import { Component, computed, inject, OnInit } from '@angular/core';
import { ProfileHeaderComponent } from '../profile-header/profile-header.component';
import { ProfileTabsComponent } from '../profile-tabs/profile-tabs.component';
import { ActivatedRoute } from '@angular/router';
import { AuthenticationService } from '../../services/authentication.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [ProfileHeaderComponent, ProfileTabsComponent],
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
