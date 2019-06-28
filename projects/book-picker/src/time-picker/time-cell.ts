import moment from 'moment';
import { TimeStatus } from './time-status';

export class TimeCell {
  cell: moment.Moment;
  status: TimeStatus;
}