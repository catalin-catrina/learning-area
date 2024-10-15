import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  ViewChild,
} from '@angular/core';
import Swiper from 'swiper';
import { IMovie } from '../interfaces/movie.interface';
import { LimitTextPipe } from '../pipes/limit-text.pipe';
import { ImageLinkPipe } from '../pipes/image-link.pipe';
import { ITvSeries } from '../interfaces/tvseries.interface';
import { animate, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-swiper',
  standalone: true,
  imports: [CommonModule, LimitTextPipe, ImageLinkPipe],
  templateUrl: './swiper.component.html',
  styleUrl: './swiper.component.css',
  animations: [
    trigger('customAnim', [
      transition('void => *', [
        style({ opacity: 0 }),
        animate(300, style({ opacity: 1 })),
      ]),
    ]),
  ],
})
export class SwiperComponent implements AfterViewInit {
  @ViewChild('swiperContainer') swiper: ElementRef | undefined;
  @Input() movies: IMovie[] = [];
  @Input() tvshows: ITvSeries[] = [];
  @Input() title = '';
  @Input() type = '';
  toggleDetails: number = -1;

  ngAfterViewInit(): void {
    this.initSwiper();
  }

  initSwiper() {
    return new Swiper(this.swiper?.nativeElement, {
      slidesPerView: 3,
      slidesPerGroup: 2,
      centeredSlides: false,
      loop: true,
      breakpoints: {
        600: {
          slidesPerView: 3,
          slidesPerGroup: 2,
          spaceBetween: 5,
          centeredSlides: false,
        },
        900: {
          slidesPerView: 3,
          slidesPerGroup: 3,
          spaceBetween: 5,
          centeredSlides: false,
        },
        1200: {
          slidesPerView: 4,
          slidesPerGroup: 4,
          spaceBetween: 5,
          centeredSlides: false,
        },
      },
    });
  }

  onMouseEnter(id: number) {
    this.toggleDetails = id;
  }

  onMouseLeave() {
    this.toggleDetails = -1;
  }
}
