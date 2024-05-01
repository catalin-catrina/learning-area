import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { CommonModule } from '@angular/common';
import { HeroComponent } from '../hero/hero.component';
import { MoviesService } from '../services/movies.service';
import { SwiperComponent } from '../swiper/swiper.component';
import { IMovie } from '../interfaces/movie.interface';
import { forkJoin, map } from 'rxjs';
import { ITvSeries } from '../interfaces/tvseries.interface';

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  imports: [CommonModule, HeaderComponent, HeroComponent, SwiperComponent],
})
export class HomeComponent implements OnInit {
  user = JSON.parse(sessionStorage.getItem('user')!);
  heroDetails: IMovie = {} as IMovie;
  hero: any = [];
  movies: IMovie[] = [];
  tvshows: ITvSeries[] = [];
  upcomingMovies: IMovie[] = [];
  upcomingTvShows: ITvSeries[] = [];
  nowPlayingMovies: IMovie[] = [];
  popularMovies: IMovie[] = [];
  topRatedMovies: IMovie[] = [];

  sources = [
    this.moviesService.getDiscoverMovies(),
    this.moviesService.getDiscoverTV(),
    this.moviesService.getUpcomingMovies(),
    this.moviesService.getComingNextWeekTV(),
    this.moviesService.getNowPlayingMovies(),
    this.moviesService.getPopularMovies(),
    this.moviesService.getTopRatedMovies(),
  ];

  constructor(private moviesService: MoviesService) {}

  ngOnInit(): void {
    forkJoin(this.sources).subscribe((res) => {
      this.movies = res[0].results as IMovie[];
      this.tvshows = res[1].results as ITvSeries[];
      this.upcomingMovies = res[2].results as IMovie[];
      this.upcomingTvShows = res[3].results as ITvSeries[];
      this.nowPlayingMovies = res[4].results as IMovie[];
      this.popularMovies = res[5].results as IMovie[];
      this.topRatedMovies = res[6].results as IMovie[];

      this.moviesService
        .getHeroVideo(this.popularMovies[0]?.id)
        .subscribe((res: any) => {
          this.hero = res.results;
          this.heroDetails = this.popularMovies[0];
        });
    });
  }
}
