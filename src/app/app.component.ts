import { Component } from '@angular/core';
import moment from 'moment';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  name = 'Book Picker';
  selectedDate: moment.Moment;

  onSelectedDate(value: moment.Moment) {
    this.selectedDate = value.clone();
  }
}
