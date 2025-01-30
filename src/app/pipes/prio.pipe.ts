import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'prio'
})
export class PrioPipe implements PipeTransform {

  transform(value: string, ...args: any[]): any {
    let colorClass = 'prio-low';
    switch (value) {
      case 'low':
        colorClass = 'prio-low';
        break;
      case 'medium':
        colorClass = 'prio-medium';
        break;
      case 'high':
        colorClass = 'prio-high';
        break;
    }
    return colorClass;
  }

}
