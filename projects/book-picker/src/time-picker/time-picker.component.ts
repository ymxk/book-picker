import { Component, OnInit, Input, Output, OnChanges, SimpleChange, EventEmitter } from '@angular/core';
import moment from 'moment';
import { TimeRange } from '../time-range';
import { Booked } from '../booked';
import { Hours } from '../hours';
import { HoursOfDay } from './hours-of-day';
import { TimeCell } from './time-cell';
import { TimeStatus } from './time-status';

@Component({
  selector: 'app-time-picker',
  templateUrl: './time-picker.component.html',
  styleUrls: ['./time-picker.component.scss']
})
export class TimePickerComponent implements OnInit {
  timeCells: TimeCell[] = [];
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

  isSameDay(v: moment.Moment) {
    return moment().isSame(v, 'month') && moment().isSame(v, 'day');
  }

  getDefaultOpenHours() {
    return new HoursOfDay(this.nowTime.clone().startOf('day'), this.nowTime.clone().endOf('day'));
  }

  replaceStartByNow(oh: HoursOfDay) {
    if (this.isSameDay(oh.start)) {
      const y = parseFloat(this.nowTime.clone().format('mm')) % 30;
      return new HoursOfDay(this.nowTime.clone().subtract(y, 'm').add(30, 'm'), oh.end);
    }
    return oh;
  }

  getHoursForDays() {
    let oh = this.getOpenHoursOnDated();
    if (oh && oh.length > 0) {
      let ohs = oh[0];
      let s = this.nowTime.clone().hour(ohs.opens.hour()).minute(ohs.opens.minute());
      let e = this.nowTime.clone().hour(ohs.closes.hour()).minute(ohs.closes.minute());
      this.createHours(new HoursOfDay(s, e));
    } else {
      this.createHours(this.getDefaultOpenHours());
    }
  }

  createHours(oh: HoursOfDay) {
    let t = this.replaceStartByNow(oh);
    let start = t.start.clone();
    let end = t.end.clone();
    this.hoursOfDay = [];
    for (let item = start; item.isBefore(end); item.add(30, 'm')) {
      this.timeCells.push(new TimeCell(item.clone(), TimeStatus.NOMAL));
    }
  }

  getOpenHoursOnDated() {
    return this.hours.filter((e: Hours) => { return e.weeks.includes(this.nowTime.day()); });
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