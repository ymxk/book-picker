import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({
  name: 'weekdays'
})
export class WeekdaysPipePipe implements PipeTransform {

  weekdays: string[] = [
    "天", "一", "二", "三", "四", "五", "六"
  ]

  transform(value: moment.Moment): string {
    if (!value) { return ''; }
    return this.weekdays[value.day()];
  }

}