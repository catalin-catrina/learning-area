import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PostsService } from '../../services/posts.service';
import Post from '../../models/post.interface';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-post',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './post.component.html',
  styleUrl: './post.component.scss',
})
export class PostComponent implements OnInit {
  postId!: string;
  post!: any;

  route = inject(ActivatedRoute);
  postsService = inject(PostsService);

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.postId = params['id'];
    });

    this.postsService
      .getUserPostById(this.postId)
      .then((post) => {
        this.post = post;
      })
      .catch((error) => console.error(error.message));
  }
}
