import { Component, OnInit } from '@angular/core';
import moment from 'moment';

@Component({
  selector: 'app-date-picker',
  templateUrl: './date-picker.component.html',
  styleUrls: ['./date-picker.component.css']
})
export class DatePickerComponent implements OnInit {
  days: any[] = [];
  selected: any = moment();
  endDayForMonth: any = moment().add(15, 'd');

  constructor() { }

  ngOnInit() {
    this.getDaysForMonth();
  }

  getDaysForMonth() {
    for (let item = moment(); item.isBefore(this.endDayForMonth); item.add(1, 'd')) {
      this.days.push(item.clone());
    }
  }

}