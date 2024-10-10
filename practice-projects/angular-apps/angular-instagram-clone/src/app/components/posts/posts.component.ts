import { Component, inject } from '@angular/core';
import { PostsService } from '../../services/posts.service';
import { AsyncPipe, CommonModule } from '@angular/common';

@Component({
  selector: 'app-posts',
  standalone: true,
  imports: [CommonModule, AsyncPipe],
  templateUrl: './posts.component.html',
  styleUrl: './posts.component.scss',
})
export class PostsComponent {
  private postsService = inject(PostsService);

  postsUrls = this.postsService.getUserPosts();
}
