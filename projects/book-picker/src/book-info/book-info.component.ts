import { Component, OnInit, Input } from '@angular/core';
import { TimeRange } from '../time-range';
@Component({
  selector: 'app-book-info',
  templateUrl: './book-info.component.html',
  styleUrls: ['./book-info.component.scss']
})
export class BookInfoComponent implements OnInit {
  @Input() timeRange: TimeRange;

  constructor() { }

  ngOnInit() {
  }

}