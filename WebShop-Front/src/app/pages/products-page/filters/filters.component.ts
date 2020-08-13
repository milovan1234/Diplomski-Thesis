import { Component, OnInit, Input } from '@angular/core';
import { Producer } from 'src/app/models/producer';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.css']
})
export class FiltersComponent implements OnInit {
  @Input() producer: Producer;
  constructor() { }

  ngOnInit(): void {
  }

}
