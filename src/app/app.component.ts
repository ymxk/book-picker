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

  ngOnInit() {
    let booked = { start: moment(), end: moment().add(30, 'minute') }
    this.bookeds.push(booked);
  }

  onSelected(value: any) {
    console.log(value);
  }
}
