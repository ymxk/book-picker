import { Component, OnInit, Input, OnChanges, SimpleChange } from '@angular/core';
import moment from 'moment';

@Component({
  selector: 'app-time-picker',
  templateUrl: './time-picker.component.html',
  styleUrls: ['./time-picker.component.css']
})
export class TimePickerComponent implements OnInit {
  hours: moment.Moment[] = [];
  @Input() nowTime: moment.Moment = moment();
  endDayForMonth: moment.Moment = moment().endOf('day');
  start: moment.Moment;
  end: moment.Moment;

  constructor() { }

  ngOnInit() {
    this.getHoursForDays(this.nowTime);
  }

  onClear() {
    this.start = null;
    this.end = null;
  }

  onSelected(value: moment.Moment) {
    if (this.start && this.end && this.start.isSame(value, 'minute')) {
      this.start = this.end;
      return false;
    }
    if (this.start && this.end && this.end.isSame(value, 'minute')) {
      this.end = this.start;
      return false;
    }
    if (!this.start && !this.end) {
      this.start = value;
      this.end = value;
    }
    if (value.isBefore(this.start)) {
      this.end = this.start;
      this.start = value;
    }
    if (value.isAfter(this.start)) {
      this.end = value;
    }
  }

  getClassForTimeCell(value: moment.Moment) {
    if (value.isBefore(this.nowTime, 'minute')) {
      return 'time-disable'
    }
    if (value.isBetween(this.start, this.end, 'minute') || value.isSame(this.start, 'minute') || value.isSame(this.end, 'minute')) {
      return 'time-selected'
    }
  }

  getHoursForDays(start: moment.Moment) {
    const y = parseFloat(start.format('mm')) % 30;
    for (let item = start.subtract(y, 'm').add(30, 'm'); item.isBefore(this.endDayForMonth); item.add(30, 'm')) {
      this.hours.push(item.clone());
    }
  }

  ngOnChanges(changes: { [propKey: string]: SimpleChange }) {
    let log: string[] = [];
    for (let propName in changes) {
      let changedProp = changes[propName];
      let to = JSON.stringify(changedProp.currentValue);
      if (changedProp.isFirstChange()) {
        this.nowTime = moment();
      } else {
        this.nowTime = changedProp.currentValue;
        this.getHoursForDays(this.nowTime);
      }
    }
  }

}