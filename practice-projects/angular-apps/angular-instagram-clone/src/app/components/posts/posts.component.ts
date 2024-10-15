import { Component, inject } from '@angular/core';
import { PostsService } from '../../services/posts.service';
import { AsyncPipe, CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { month } from '../../constants/constants';

@Component({
  selector: 'app-posts',
  standalone: true,
  imports: [CommonModule, AsyncPipe, RouterLink, RouterLinkActive],
  templateUrl: './posts.component.html',
  styleUrl: './posts.component.scss',
})
export class PostsComponent {
  month = month;

  private postsService = inject(PostsService);

  posts$ = this.postsService.posts$;
}
