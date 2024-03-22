import { Pipe, PipeTransform } from '@angular/core';
import { DatePipe } from '@angular/common';

@Pipe({
  name: 'dateOnly'
})
export class DateOnlyPipe implements PipeTransform {

  transform(value: any, ...args: any[]): any {
    const datePipe: DatePipe = new DatePipe('en-US');
    return datePipe.transform(value,"yyyy-MM-dd"); 
  }

}
