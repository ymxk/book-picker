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
    this.bookeds.push({ start: moment().add(30, 'm'), end: moment().add(60, 'm') });
    this.bookeds.push({ start: moment().add(90, 'm'), end: moment().add(120, 'm') });
    this.hours.push({ weeks: [1, 2, 3, 4], opens: moment().startOf('day').add(8, 'h'), closes: moment().endOf('day').subtract(4, 'h') });
  }

  onSelected(value: any) {
    console.log(value);
  }

  onError() {
    console.log('onError');
  }
}
