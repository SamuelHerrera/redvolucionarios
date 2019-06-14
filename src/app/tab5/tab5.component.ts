import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tab5',
  templateUrl: './tab5.component.html',
  styleUrls: ['./tab5.component.scss'],
})
export class Tab5Component implements OnInit {

  searchText: string = null;

  constructor() { }

  ngOnInit() { }

  ocultarBusqueda() {
    //router to tab1
  }

  onSearchChange(data) {
    console.log('updated value: ' + data.detail.value);
    this.searchText = data.detail.value;
    //trigger search by input update
  }
}
