import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'descriptionMK'
})
export class DescriptionMKPipe implements PipeTransform {

  transform(value: string, ...args: string[]): string {
    if (value) {
      return value
        .replace(/\n/g, '<br>')
        .replaceAll('---', '<hr class="panel">');
    }
    return "";
  }

}
