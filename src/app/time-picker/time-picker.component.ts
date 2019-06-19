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
    console.log(this.start);
  }

  getClassForTimeCell(value: moment.Moment){
    if(value.isBefore(this.nowTime, 'minute')){
      return 'time-disable'
    }
  }

  getHoursForDays() {
    for (let item = moment().startOf('day'); item.isBefore(this.endDayForMonth); item.add(30, 'm')) {
      this.hours.push(item.clone());
    }
  }

}