import { Component, OnInit } from '@angular/core';
import moment from 'moment';
import { DatePicker } from '../DatePicker'

@Component({
  selector: 'app-date-picker',
  templateUrl: './date-picker.component.html',
  styleUrls: ['./date-picker.component.css']
})
export class DatePickerComponent implements OnInit {
  days: any[] = [];
  selected: any = moment();
  endDayForMonth: any = moment().endOf('month');

  constructor() { }

  ngOnInit() {
    this.getDaysForMonth();

    console.log(moment().day());
  }

  getDaysForMonth() {
    for (let item = moment(); item.isBefore(this.endDayForMonth); item.add(1, 'd')) {
      this.days.push(item.clone());
    }
  }

}