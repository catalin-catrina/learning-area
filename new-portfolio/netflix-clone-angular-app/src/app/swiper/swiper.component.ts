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

@Component({
  selector: 'app-swiper',
  standalone: true,
  imports: [CommonModule, LimitTextPipe, ImageLinkPipe],
  templateUrl: './swiper.component.html',
  styleUrl: './swiper.component.css',
})
export class SwiperComponent implements AfterViewInit {
  @ViewChild('swiperContainer') swiper: ElementRef | undefined;
  @Input() movies: IMovie[] = [];
  @Input() title = '';

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
}
