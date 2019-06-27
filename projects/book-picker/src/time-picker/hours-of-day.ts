import moment from 'moment';
export class HoursOfDay {
  start: moment.Moment;
  end: moment.Moment;

  constructor(start: moment.Moment, end: moment.Moment) {
    this.start = start;
    this.end = end;
  }
}