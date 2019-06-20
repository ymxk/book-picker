import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import moment from 'moment';

@Component({
  selector: 'app-date-picker',
  templateUrl: './date-picker.component.html',
  styleUrls: ['./date-picker.component.css']
})
export class DatePickerComponent implements OnInit {
  days: moment.Moment[] = [];
  selectedDate: moment.Moment = moment();
  endDayForMonth: moment.Moment = moment().add(15, 'd');
  @Output() selected = new EventEmitter<moment.Moment>();

  constructor() { }

  ngOnInit() {
    this.getDaysForMonth();
  }

  onSelected(value: moment.Moment) {
    this.selectedDate = value;
    this.selected.emit(value);
  }

  isSameDay(value: moment.Moment) {
    return this.selectedDate.isSame(value, 'day') ? 'date-selected' : '';
  }

  getDaysForMonth() {
    for (let item = moment(); item.isBefore(this.endDayForMonth); item.add(1, 'd')) {
      this.days.push(item.clone());
    }
  }

}