import { PipeTransform, Pipe } from '@angular/core';
@Pipe({
  name: 'shorten',
})
export class ShortPipe implements PipeTransform {
  transform(value: any) {
    if (value.length > 80) {
      return value.substr(0, 80);
    }
    return value;
  }
}
