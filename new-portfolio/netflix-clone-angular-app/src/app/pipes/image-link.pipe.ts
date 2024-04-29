import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'imageLink',
  standalone: true,
})
export class ImageLinkPipe implements PipeTransform {
  transform(value: string, size: string): unknown {
    return `https://image.tmdb.org/t/p/${size}${value}`;
  }
}
