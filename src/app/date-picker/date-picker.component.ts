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
  item: any = moment();
  endDayForMonth: any = moment().endOf('month');

  constructor() { }

  ngOnInit() {
    console.log(moment().isBefore(this.endDayForMonth));
    // while (moment().isBefore(this.endDayForMonth)) {
    //   this.item.add(1, 'd');
    //   this.days.push(this.item);
    // }

  }

}