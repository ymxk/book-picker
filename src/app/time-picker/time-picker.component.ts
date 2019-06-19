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

  onSelected(value: moment.Moment) {
    if (this.start == undefined || this.start == null) {
      this.start = value;
    }
    if (this.start.isSame(value, 'minute')) {
      this.start = null;
    }
    if (this.end.isSame(value, 'minute')) {
      this.end = null;
    }
    if (value.isBetween(this.start, this.end, 'minute')) {
      this.end = value;
    }
    if (value.isBefore(this.start)) {
      this.end = this.start;
      this.start = value;
    }
    if (value.isBefore(this.end)) {
      this.end = value;
    }
  }

  getClassForTimeCell(value: moment.Moment) {
    if (value.isBefore(this.nowTime, 'minute')) {
      return 'time-disable'
    }
    if (value.isBetween(this.start, this.end, 'minute')) {
      return 'time-selected'
    }
  }

  getHoursForDays() {
    for (let item = moment().startOf('day'); item.isBefore(this.endDayForMonth); item.add(30, 'm')) {
      this.hours.push(item.clone());
    }
  }

}