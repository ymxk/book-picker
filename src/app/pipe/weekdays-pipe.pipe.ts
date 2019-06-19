import { Pipe, PipeTransform } from '@angular/core';
import moment from 'moment';

@Pipe({
  name: 'weekdays'
})
export class WeekdaysPipePipe implements PipeTransform {
  now: any = moment();
  weekdays: string[] = [
    "天", "一", "二", "三", "四", "五", "六"
  ]

  transform(value: moment.Moment): string {
    if (!value) { return ''; }
    return this.now.isSame(value, 'day') ? '今日' : this.weekdays[value.day()];
  }

}