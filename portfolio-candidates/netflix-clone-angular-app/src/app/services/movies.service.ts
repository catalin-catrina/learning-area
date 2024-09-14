import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environment';

const options = {
  headers: {
    accept: 'application/json',
    Authorization: environment.accessToken,
  },
  parameters: {
    include_adult: false,
    page: '1',
    language: 'en-US',
  },
};

@Injectable({
  providedIn: 'root',
})
export class MoviesService {
  constructor(private httpClient: HttpClient) {}

  getDiscoverMovies() {
    return this.httpClient.get<any>(
      'https://api.themoviedb.org/3/discover/movie',
      options
    );
  }

  getDiscoverTV() {
    return this.httpClient.get<any>(
      'https://api.themoviedb.org/3/discover/tv',
      options
    );
  }

  getNowPlayingMovies() {
    return this.httpClient.get(
      'https://api.themoviedb.org/3/movie/now_playing',
      options
    );
  }

  getPopularMovies() {
    return this.httpClient.get(
      'https://api.themoviedb.org/3/movie/popular',
      options
    );
  }

  getTopRatedMovies() {
    return this.httpClient.get(
      'https://api.themoviedb.org/3/movie/top_rated',
      options
    );
  }

  getUpcomingMovies() {
    return this.httpClient.get(
      'https://api.themoviedb.org/3/movie/upcoming',
      options
    );
  }

  getComingNextWeekTV() {
    return this.httpClient.get(
      'https://api.themoviedb.org/3/tv/on_the_air',
      options
    );
  }

  getHeroImage(id: number) {
    return this.httpClient.get(
      `https://api.themoviedb.org/3/movie/${id}/images`,
      options
    );
  }

  getHeroVideo(id: number) {
    return this.httpClient.get(
      `https://api.themoviedb.org/3/movie/${id}/videos`,
      options
    );
  }

  getHeroDetails(id: number) {
    return this.httpClient.get(
      `https://api.themoviedb.org/3/movie/${id}`,
      options
    );
  }
}
