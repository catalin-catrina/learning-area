import { Component } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { PostsComponent } from '../posts/posts.component';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [MatTabsModule, PostsComponent],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
})
export class ProfileComponent {}
