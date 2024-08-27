import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { IMovie } from '../interfaces/movie.interface';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.css',
})
export class HeroComponent implements OnChanges {
  @Input({ required: true }) heroDetails!: IMovie;
  @Input({ required: true }) heroVideo!: any;
  videoUrl = this.domSanitizer.bypassSecurityTrustResourceUrl(
    `https://www.youtube.com/embed/${this.heroVideo}?autoplay=1&mute=1&loop=1&controls=0`
  );

  constructor(private domSanitizer: DomSanitizer) {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes['heroVideo']) {
      this.videoUrl = this.domSanitizer.bypassSecurityTrustResourceUrl(
        `https://www.youtube.com/embed/${this.heroVideo}?autoplay=1&mute=1&loop=1&controls=0`
      );
    }
  }
}
