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
    let booked = { start: moment().add(30, 'm'), end: moment().add(60, 'm') }
    this.bookeds.push(booked);
  }

  onSelected(value: any) {
    console.log(value);
  }

  onError(){
    console.log('onError');
  }
}
