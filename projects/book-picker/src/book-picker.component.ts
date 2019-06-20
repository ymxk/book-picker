import { Component } from '@angular/core';
import moment from 'moment';
import { TimeRange } from './time-range';

@Component({
  selector: 'book-picker',
  templateUrl: './book-picker.component.html',
  styleUrls: ['./book-picker.component.css']
})
export class BookPickerComponent {
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
