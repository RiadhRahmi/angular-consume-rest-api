import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'capitalize'
})
export class CapitalizePipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if (value === null) {
      return 'Not assigned';
    }
    return value.charAt(0).toUpperCase() + (value.slice(1).toLowerCase());
  }


}
