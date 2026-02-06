import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'relativeDate',
  pure: true
})
export class RelativeDatePipe implements PipeTransform {

 transform(value: Date): string {
    const diff = Math.floor(
      (Date.now() - new Date(value).getTime()) / 86400000
    );

    return diff === 0 ? 'Today' : `${diff} days ago`;
  }
}


