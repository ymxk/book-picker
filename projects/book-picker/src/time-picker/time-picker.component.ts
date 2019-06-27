import { Component, OnInit, Input, Output, OnChanges, SimpleChange, EventEmitter } from '@angular/core';
import moment from 'moment';
import { TimeRange } from '../time-range';
import { Booked } from '../booked';
import { Hours } from '../hours';

@Component({
  selector: 'app-time-picker',
  templateUrl: './time-picker.component.html',
  styleUrls: ['./time-picker.component.scss']
})
export class TimePickerComponent implements OnInit {
  hoursOfDay: moment.Moment[] = [];
  @Input() nowTime: moment.Moment = moment();
  @Input() bookeds: Booked[] = new Array();
  @Input() hours: Hours[] = new Array();
  @Output() selected = new EventEmitter<TimeRange>();
  @Output() onerror = new EventEmitter<TimeRange>();
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

  emitError() {
    this.onerror.emit();
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
      let x = this.includesTime(value.clone(), this.start.clone());
      if (x) {
        this.emitError();
        return false;
      } else {
        this.end = this.start;
        this.start = value;
      }
    }
    if (value.isAfter(this.start)) {
      let x = this.includesTime(this.start.clone(), value.clone());
      if (x) {
        this.emitError();
        return false;
      } else {
        this.end = value;
      }
    }
    this.emitSelected();
  }

  includesTime(start: moment.Moment, end: moment.Moment) {
    let range = [];
    for (let item = start; item.isBefore(end); item.add(30, 'm')) {
      range.push(item.clone());
    }
    return range.filter(e => { return this.includesBooked(e); }).length > 0;
  }

  includesBooked(value: moment.Moment) {
    return this.bookeds.filter(e => { return this.isBetween(value, e) }).length > 0;
  }

  isBetween(value: moment.Moment, b: Booked) {
    return value.isBetween(b.start, b.end, 'm') || value.isSame(b.start, 'm') || value.isSame(b.end, 'm');
  }

  getClassForTimeCell(value: moment.Moment) {
    if (value.isBefore(this.nowTime, 'm') && moment().isSame(this.nowTime, 'day')) {
      return 'time-disable';
    }
    if (value.isBetween(this.start, this.end, 'm') || value.isSame(this.start, 'm') || value.isSame(this.end, 'm')) {
      return 'time-selected';
    }
    if (this.includesBooked(value)) {
      return 'time-booked';
    }
    return '';
  }

  getHoursForDays() {
    this.hoursOfDay = [];
    let start;
    if (moment().isSame(this.nowTime, 'day')) {
      const y = parseFloat(moment().format('mm')) % 30;
      start = moment().subtract(y, 'm').add(30, 'm');
    } else {
      start = this.nowTime.startOf('day');
    }
    let end = start.clone().endOf('day');

    this.hours.forEach(e => { });

    console.log(this.hours);

    for (let item = start; item.isBefore(end); item.add(30, 'm')) {
      this.hoursOfDay.push(item.clone());
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