import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { HeaderComponent } from '../header/header.component';
import { CommonModule } from '@angular/common';
import { HeroComponent } from '../hero/hero.component';
import { MoviesService } from '../services/movies.service';
import { SwiperComponent } from '../swiper/swiper.component';
import { IMovie } from '../interfaces/movie.interface';

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  imports: [CommonModule, HeaderComponent, HeroComponent, SwiperComponent],
})
export class HomeComponent implements OnInit {
  user = JSON.parse(sessionStorage.getItem('user')!);
  popularMovies: IMovie[] = [];

  constructor(private moviesService: MoviesService) {}

  ngOnInit(): void {
    this.moviesService.getDiscoverMovies().subscribe((res) => {
      this.popularMovies = res.results;
      console.log(res);
    });
  }
}
