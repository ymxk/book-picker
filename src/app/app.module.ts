import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { MomentModule } from 'ngx-moment';

import { AppComponent } from './app.component';
import { HelloComponent } from './hello.component';
import { TimePickerComponent } from './time-picker/time-picker.component';
import { DatePickerComponent } from './date-picker/date-picker.component';
import { BookInfoComponent } from './book-info/book-info.component';
import { WeekdaysPipePipe } from './pipe/weekdays-pipe.pipe';
import { TimetablePipe } from './pipe/timetable.pipe';
import { BooktimePipe } from './pipe/booktime.pipe';

@NgModule({
  imports: [BrowserModule, FormsModule, MomentModule],
  declarations: [AppComponent, HelloComponent, TimePickerComponent, DatePickerComponent, BookInfoComponent, WeekdaysPipePipe, TimetablePipe, BooktimePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
