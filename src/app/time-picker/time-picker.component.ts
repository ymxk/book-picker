import { Component, OnInit } from '@angular/core';
import moment from 'moment';

@Component({
  selector: 'app-time-picker',
  templateUrl: './time-picker.component.html',
  styleUrls: ['./time-picker.component.css']
})
export class TimePickerComponent implements OnInit {
  hours: any[] = [];
  selected: any = moment();
  endDayForMonth: any = moment().endOf('day');

  constructor() { }

  ngOnInit() {
    this.getHoursForDays();
  }

  getClassForTimeCell(value: moment.Moment){
    if(value.isBefore(this.selected, 'minute')){
      return 'time-disable'
    }
  }

  getHoursForDays() {
    for (let item = moment().startOf('day'); item.isBefore(this.endDayForMonth); item.add(30, 'm')) {
      this.hours.push(item.clone());
    }
  }

}