import { Component, Output, EventEmitter } from '@angular/core';
import moment from 'moment';
import { TimeRange } from './time-range';

@Component({
  selector: 'book-picker',
  templateUrl: './book-picker.component.html',
  styleUrls: ['./book-picker.component.scss']
})
export class BookPickerComponent {
  name = 'Book Picker';
  selectedDate: moment.Moment;
  timeRange: TimeRange;
  @Output() selected = new EventEmitter<any>();

  onSelectedDate(value: moment.Moment) {
    this.selectedDate = value.clone();
  }

  onSelectedTime(value: TimeRange) {
    this.timeRange = value;
    this.selected.emit(value);
  }
}
