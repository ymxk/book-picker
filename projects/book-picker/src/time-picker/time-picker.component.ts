import { Component, OnInit, Input, Output, OnChanges, SimpleChange, EventEmitter } from '@angular/core';
import moment from 'moment';
import { TimeRange } from '../time-range';
import { Booked } from '../booked';
import { Hours } from '../hours';
import { HoursOfDay } from './hours-of-day';
import { TimeClass } from './time-class.enum';
import jspath from "jspath";

@Component({
  selector: 'app-time-picker',
  templateUrl: './time-picker.component.html',
  styleUrls: ['./time-picker.component.scss']
})
export class TimePickerComponent implements OnInit {
  timeCells: moment.Moment[] = [];
  @Input() nowTime: moment.Moment = moment();
  @Input() bookeds: Booked[] = new Array();
  @Input() hours: Hours[] = new Array();
  @Output() selected = new EventEmitter<TimeRange>();
  @Output() onerror = new EventEmitter<TimeRange>();
  start: moment.Moment;
  end: moment.Moment;

  constructor() { }

  ngOnInit() {
    console.log(this.start);
    this.getHoursForDays();
  }

  onClear() {
    this.start = null;
    this.end = null;
  }

  emitSelected() {
    this.selected.emit({ start: this.start, end: this.addHalfHour(this.end) });
  }

  addHalfHour(v: moment.Moment) {
    return v ? v.clone().add(30, 'm') : null;
  }

  emitError() {
    this.onerror.emit();
  }

  onSelected(value: moment.Moment) {
    if (this.start && this.end && this.start.isSame(value, 'm') && this.end.isSame(value, 'm')) {
      this.onClear();
      this.emitSelected();
      return false;
    }
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
      let x = this.includesDisable(value.clone(), value.clone());
      if (x) {
        this.emitError();
        return false;
      }
      this.start = value;
      this.end = value;
      this.emitSelected();
      return false;
    }
    if (value.isBefore(this.start)) {
      let x = this.includesDisable(value.clone(), this.start.clone());
      if (x) {
        this.emitError();
        return false;
      }
      this.end = this.start;
      this.start = value;
    }
    if (value.isAfter(this.start)) {
      let x = this.includesDisable(this.start.clone(), value.clone());
      if (x) {
        this.emitError();
        return false;
      }
      this.end = value;
    }
    this.emitSelected();
  }

  includesDisable(start: moment.Moment, end: moment.Moment) {
    let range = [];
    for (let item = start; item.isBefore(end) || item.isSame(end); item.add(30, 'm')) {
      range.push(item.clone());
    }
    return range.filter(e => { return this.includesBooked(e) || this.includesCloses(e); }).length > 0;
  }

  includesBooked(v: moment.Moment) {
    return this.bookeds.filter(e => { return this.isBetweenDate(v, e.start, e.end) }).length > 0;
  }

  includesCloses(v: moment.Moment) {
    let ph = this.getOpenHoursOnDated();
    if (ph && ph.length == 0) {
      return false;
    }
    return ph.filter(e => { return this.isBetweenNotEnd(v, e.opens, e.closes); }).length == 0;
  }

  isBetweenNotEnd(v: moment.Moment, s: moment.Moment, e: moment.Moment) {
    let vs = this.setHourMinuteIgnorDate(v);
    let ss = this.setHourMinuteIgnorDate(s);
    let es = this.setHourMinuteIgnorDate(e);
    return (vs.isBetween(ss, es, 'm') || vs.isSame(ss, 'm')) ? true : false;
  }

  isBetweenDate(v: moment.Moment, s: moment.Moment, e: moment.Moment) {
    return v.isBetween(s, e) || v.isSame(s) || v.isSame(e);
  }

  isBetweenM(v: moment.Moment, s: moment.Moment, e: moment.Moment) {
    return v.isBetween(s, e, 'm') || v.isSame(s, 'm') || v.isSame(e, 'm');
  }

  getClassBy(value: moment.Moment) {
    if (this.includesBooked(value)) {
      return TimeClass.BOOKED;
    }
    if (this.includesCloses(value)) {
      return TimeClass.DISABLE;
    }
    if (this.isBetweenM(value, this.start, this.end)) {
      return TimeClass.SELECTED;
    }
    return TimeClass.NORMAL;
  }

  isSameDay(v: moment.Moment) {
    return moment().isSame(v, 'month') && moment().isSame(v, 'day');
  }

  getDefaultOpenHours() {
    return new HoursOfDay(this.nowTime.clone().startOf('day'), this.nowTime.clone().endOf('day'));
  }

  nextHalfHourInNow() {
    const y = parseFloat(this.nowTime.clone().format('mm')) % 30;
    return this.addHalfHour(this.nowTime.clone().subtract(y, 'm'));
  }

  replaceStartByNow(oh: HoursOfDay) {
    let start = this.setHourMinuteIgnorDate(oh.start);
    if (this.isSameDay(start)) {

      return new HoursOfDay(this.nextHalfHourInNow(), oh.end);
    }
    return oh;
  }

  getHoursForDays() {
    let oh = this.getOpenHoursOnDated();
    if (oh && oh.length > 0) {
      this.createHours(this.toHoursOfDayFrom(oh));
    } else {
      this.createHours(this.getDefaultOpenHours());
    }
  }

  setHourMinuteIgnorDate(v: moment.Moment) {
    return this.nowTime.clone().hour(v.hour()).minute(v.minute());
  }

  createHours(oh: HoursOfDay) {
    let t = this.replaceStartByNow(oh);
    let start = t.start.clone();
    let end = t.end.clone();
    this.timeCells = [];
    for (let item = start; item.isBefore(end); item.add(30, 'm')) {
      this.timeCells.push(item.clone());
    }
  }

  getOpenHoursOnDated() {
    return this.hours.filter((e: Hours) => { return e.weeks.includes(this.nowTime.day()); })
  };

  toHoursOfDayFrom(ts: Hours[]) {
    const opens = jspath.apply(`.opens`, ts);
    const closes = jspath.apply(`.closes`, ts);
    return new HoursOfDay(this.setHourMinuteIgnorDate(moment.min(opens)), this.setHourMinuteIgnorDate(moment.max(closes)));
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