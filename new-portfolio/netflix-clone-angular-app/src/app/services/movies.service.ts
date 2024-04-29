import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

const options = {
  headers: {
    accept: 'application/json',
    Authorization:
      'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1ZjRhZmY3OGJmZjgyNWVmZTVkYTFmYjJmMDRhNDljZSIsInN1YiI6IjYyZDNlZTdiOTE3NDViMDA0Y2JhZmZjNyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.bnR9vO07CHhsl_bjw1ph_3bWOeS6azDPLPpa0Xbu1FA',
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
    return this.httpClient.get<any>('https://api.themoviedb.org/3/discover/tv');
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
      `https://api.themoviedb.org/3/movie/${id}/images`
    );
  }

  getHeroVideo(id: number) {
    return this.httpClient.get(
      `https://api.themoviedb.org/3/movie/${id}/videos`
    );
  }

  getHeroDetails(id: number) {
    return this.httpClient.get(
      `https://api.themoviedb.org/3/movie/${id}`,
      options
    );
  }
}
