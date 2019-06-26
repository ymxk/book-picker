import { Component, OnInit, Input, Output, OnChanges, SimpleChange, EventEmitter } from '@angular/core';
import moment from 'moment';
import { TimeRange } from '../time-range';
import { Booked } from '../booked';

@Component({
  selector: 'app-time-picker',
  templateUrl: './time-picker.component.html',
  styleUrls: ['./time-picker.component.scss']
})
export class TimePickerComponent implements OnInit {
  hours: moment.Moment[] = [];
  @Input() nowTime: moment.Moment = moment();
  @Input() bookeds: Booked[] = new Array();
  @Output() selected = new EventEmitter<TimeRange>();
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

  emitSelected() {
    this.selected.emit({ start: this.start, end: this.end.clone().add(30, 'm') });
  }

  onSelected(value: moment.Moment) {
    if (this.start && this.end && this.start.isSame(value, 'm')) {
      this.start = this.end;
      this.emitSelected();
      return false;
    }
    if (this.start && this.end && this.end.isSame(value, 'm')) {
      this.end = this.start;
      this.emitSelected();
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
    this.emitSelected();
  }

  getBookedBy(value: moment.Moment) {
    return this.bookeds.filter(e => { return value.isBetween(e.start, e.end, 'm') || value.isSame(e.start, 'm') || value.isSame(e.end, 'm'); });
  }

  getClassForTimeCell(value: moment.Moment) {
    if (value.isBefore(this.nowTime, 'm') && moment().isSame(this.nowTime, 'day')) {
      return 'time-disable';
    }
    if (value.isBetween(this.start, this.end, 'm') || value.isSame(this.start, 'm') || value.isSame(this.end, 'm')) {
      return 'time-selected';
    }
    let res = this.getBookedBy(value);
    if (res && res.length > 0) {
      return 'time-booked';
    }
    return '';
  }

  getHoursForDays() {
    this.hours = [];
    let start;
    if (moment().isSame(this.nowTime, 'day')) {
      const y = parseFloat(moment().format('mm')) % 30;
      start = moment().subtract(y, 'm').add(30, 'm');
    } else {
      start = this.nowTime.startOf('day');
    }
    let end = start.clone().endOf('day');
    for (let item = start; item.isBefore(end); item.add(30, 'm')) {
      this.hours.push(item.clone());
    }
  }

  ngOnChanges(changes: { [propKey: string]: SimpleChange }) {
    let log: string[] = [];
    for (let propName in changes) {
      let changedProp = changes[propName];
      if (changedProp.isFirstChange()) {
        this.nowTime = moment();
      } else {
        this.onClear();
        this.nowTime = changedProp.currentValue;
        this.getHoursForDays();
      }
    }
  }

}