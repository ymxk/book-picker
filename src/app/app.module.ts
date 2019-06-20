import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HelloComponent } from './hello.component';
import { BookPickerModule } from '../../projects/book-picker/src/book-picker.module.ts';

@NgModule({
  imports: [BrowserModule, FormsModule, MomentModule, BookPickerModule],
  declarations: [AppComponent, HelloComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
