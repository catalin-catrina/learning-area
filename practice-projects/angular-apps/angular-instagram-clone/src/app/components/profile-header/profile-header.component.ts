import { CommonModule } from '@angular/common';
import { Component, inject, Input, OnInit } from '@angular/core';
import { User } from '../../models/user.interface';
import { ProfileService } from '../../services/profile.service';

@Component({
  selector: 'app-profile-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './profile-header.component.html',
  styleUrl: './profile-header.component.scss',
})
export class ProfileHeaderComponent implements OnInit {
  @Input() profileUserId!: string | null;
  @Input() isCurrentUser!: boolean;

  private profileService = inject(ProfileService);

  user!: User | null;

  ngOnInit(): void {
    this.profileService.fetchUserById(this.profileUserId).then((user) => {
      this.user = user;
    });
  }
}
