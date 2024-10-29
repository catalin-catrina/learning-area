import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-profile-header',
  standalone: true,
  imports: [],
  templateUrl: './profile-header.component.html',
  styleUrl: './profile-header.component.scss',
})
export class ProfileHeaderComponent {
  @Input() profileUserId!: string;
  @Input() isCurrentUser!: boolean;
}
