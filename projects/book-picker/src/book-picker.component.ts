import { Component, Output, EventEmitter, Input } from '@angular/core';
import moment from 'moment';
import { TimeRange } from './time-range';
import { Booked } from './booked';

@Component({
  selector: 'book-picker',
  templateUrl: './book-picker.component.html',
  styleUrls: ['./book-picker.component.scss']
})
export class BookPickerComponent {
  name = 'Book Picker';
  selectedDate: moment.Moment;
  timeRange: TimeRange;
  @Input() bookeds: Booked[] = new Array();
  @Output() selected = new EventEmitter<any>();


  onSelectedDate(value: moment.Moment) {
    this.selectedDate = value.clone();
    this.timeRange = null;
  }

  onSelectedTime(value: TimeRange) {
    this.timeRange = value;
    this.selected.emit(value);
  }
}
