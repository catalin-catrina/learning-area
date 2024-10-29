import { Component } from '@angular/core';
import { ProfileHeaderComponent } from '../profile-header/profile-header.component';
import { ProfileTabsComponent } from '../profile-tabs/profile-tabs.component';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [ProfileHeaderComponent, ProfileTabsComponent],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
})
export class ProfileComponent {}
