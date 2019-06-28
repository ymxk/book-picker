import moment from 'moment';
import { TimeStatus } from './time-status';

export class TimeCell {
  cell: moment.Moment;
  status: TimeStatus;

  constructor(cell: moment.Moment, status: TimeStatus) {
    this.cell = cell;
    this.status = status;
  }
}