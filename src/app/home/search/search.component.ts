import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
})
export class SearchComponent implements OnInit {


  // Output decorator
  @Output() queryEvent = new EventEmitter<string>();

  // Function to emit "query" when something is typed in the input filed
  searchByQuery(query: string){
    // pass query to EventEmitter
    this.queryEvent.emit(query);
  }

  constructor() { }

  ngOnInit() {
  }

}
