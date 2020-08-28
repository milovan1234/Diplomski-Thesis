import { Component } from '@angular/core';

declare var $: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'Početna';
  
  ngOnInit(): void {
    this.loadTooltip();
  }


  loadTooltip(): void {
    $(function () {
      $('[data-toggle="tooltip"]').tooltip()
    });
  }

}
