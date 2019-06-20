import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HelloComponent } from './hello.component';
import { BookPickerModule } from '../../projects/book-picker/src/book-picker.module';

@NgModule({
  imports: [BookPickerModule],
  declarations: [AppComponent, HelloComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
