import { Component, OnInit } from '@angular/core';
import moment from 'moment';

@Component({
  selector: 'app-time-picker',
  templateUrl: './time-picker.component.html',
  styleUrls: ['./time-picker.component.css']
})
export class TimePickerComponent implements OnInit {
  hours: any[] = [];
  endDayForMonth: any = moment().endOf('day');

  constructor() { }

  ngOnInit() {
    this.getHoursForDays();
  }

  getHoursForDays() {
    for (let item = moment().startOf('day'); item.isBefore(this.endDayForMonth); item.add(30, 'm')) {
      this.hours.push(item.clone());
    }
  }

}