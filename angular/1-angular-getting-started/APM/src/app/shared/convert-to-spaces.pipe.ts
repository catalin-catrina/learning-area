import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  // the pipe's name - the name we'll use when we reference the pipe in HTML
  name: 'convertToSpaces',
})
export class ConvertToSpacesPipe implements PipeTransform {
  // first parameter is the string value
  // second parameter is the character string to use in the transformation
  transform(value: string, character: string): string {
    return value.replace(character, ' ');
  }
}
