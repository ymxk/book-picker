import { Component, OnInit } from '@angular/core';
import moment from 'moment';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  name = 'Book Picker';
  bookeds: any[] = new Array();
  hours: any[] = new Array();

  ngOnInit() {
    this.bookeds.push({ start: moment().clone().hours(9).minutes(0), end: moment().clone().hours(10).minutes(0) });
    this.bookeds.push({ start: moment().clone().hours(19).minutes(0), end: moment().clone().hours(20).minutes(30) });
    this.hours.push({ weeks: [1, 2, 3, 4], opens: moment().clone().hours(8).minutes(0), closes: moment().clone().hours(12).minutes(0) });
    this.hours.push({ weeks: [1, 2, 3, 4], opens: moment().clone().hours(14).minutes(0), closes: moment().clone().hours(21).minutes(0) });
  }

  onSelected(value: any) {
    console.log(value);
  }

  onError() {
    console.log('onError');
  }
}
