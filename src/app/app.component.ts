import { Component } from '@angular/core';
import moment from 'moment';
import { TimeRange } from './time-range';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  name = 'Book Picker';
  selectedDate: moment.Moment;
  timeRange: TimeRange;

  onSelectedDate(value: moment.Moment) {
    this.selectedDate = value.clone();
  }

  onSelectedTime(value: TimeRange) {
    console.log(value);
    this.timeRange = value;
  }
}
