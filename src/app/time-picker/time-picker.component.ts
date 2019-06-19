import { Component, OnInit } from '@angular/core';
import moment from 'moment';

@Component({
  selector: 'app-time-picker',
  templateUrl: './time-picker.component.html',
  styleUrls: ['./time-picker.component.css']
})
export class TimePickerComponent implements OnInit {
  hours: moment.Moment[] = [];
  nowTime: moment.Moment = moment();
  endDayForMonth: moment.Moment = moment().endOf('day');
  start: moment.Moment;
  end: moment.Moment;

  constructor() { }

  ngOnInit() {
    this.getHoursForDays();
  }

  onClear() {
    this.start = null;
    this.end = null;
  }

  onSelected(value: moment.Moment) {
    if (!this.start) {
      this.start = value;
      return false;
    }
    if (this.start.isSame(value, 'minute')) {
      this.start = null;
    }
    // if (value.isBetween(this.start, this.end, 'minute')) {
    //   this.end = value;
    // }
    if (value.isBefore(this.start)) {
      this.end = this.start;
      this.start = value;
    }
    if (value.isAfter(this.start)) {
      this.end = value;
    }
    console.log(this.start, this.end);
  }

  getClassForTimeCell(value: moment.Moment) {
    if (value.isBefore(this.nowTime, 'minute')) {
      return 'time-disable'
    }
    if (value.isBetween(this.start, this.end, 'minute') || value.isSame(this.start, 'minute') || value.isSame(this.end, 'minute')) {
      return 'time-selected'
    }
  }

  getHoursForDays() {
    for (let item = moment().startOf('day'); item.isBefore(this.endDayForMonth); item.add(30, 'm')) {
      this.hours.push(item.clone());
    }
  }

}