import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'prio'
})
export class PrioPipe implements PipeTransform {

  transform(value: string, ...args: any[]): any {
    let colorClass = 'prio-low';
    let valueLower = value.toLowerCase();
    switch (valueLower) {
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
