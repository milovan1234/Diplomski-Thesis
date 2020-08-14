import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Producer } from 'src/app/models/producer';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.css']
})
export class FiltersComponent implements OnInit {
  @Input() producer: Producer;
  @Output() onClick: EventEmitter<any> = new EventEmitter();

  onClickProducer(producerId: number) : void {
     this.onClick.emit(producerId);
  }
  constructor() { }

  ngOnInit(): void {
  }

}
