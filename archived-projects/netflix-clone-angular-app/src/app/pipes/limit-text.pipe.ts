import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'limitText',
  standalone: true,
})
export class LimitTextPipe implements PipeTransform {
  transform(value: any, limitBy: number): unknown {
    return `${value.slice(0, limitBy)}... `;
  }
}
