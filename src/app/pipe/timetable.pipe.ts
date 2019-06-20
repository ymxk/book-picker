import { Pipe, PipeTransform } from '@angular/core';
import moment from 'moment';
import { TimeRange } from '../time-range';

@Pipe({
  name: 'timetable'
})
export class TimetablePipe implements PipeTransform {

  transform(value: TimeRange): string {
    return (value && value.end && value.start) ? this.formatTime(value) : this.defaultFormatTime();
  }

  formatTime(value: TimeRange) {
    return `${value.start.clone().subtract(30, 'm').format('YYYY-MM-D HH:mm')} ～ ${value.end.format('HH:mm')}`
  }

  defaultFormatTime() {
    return `${moment().format('YYYY-MM-D HH:mm')} ～ ${moment().format('HH:mm')}`
  }

}