import { Pipe, PipeTransform } from '@angular/core';
import moment from 'moment';
import { TimeRange } from '../time-range';

@Pipe({
  name: 'booktime'
})
export class BooktimePipe implements PipeTransform {

  transform(value: TimeRange): string {
    return (value && value.end && value.start) ? `${moment.duration(value.end.diff(value.start.clone().subtract(30, 'm'))).asHours()}` : '0';
  }

}