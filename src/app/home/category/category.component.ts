import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { ICategory } from 'src/app/interfaces/icategory';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
})
export class CategoryComponent implements OnInit {

  // Input decorator
  @Input() categoryInput: ICategory;

  // Output decorator
  @Output() categoryEvent = new EventEmitter<number>();

  filterByCategory(){
    // pass category to EventEmitter
    this.categoryEvent.emit(this.categoryInput.id);
  }

  constructor() { }

  ngOnInit() {
  }

}
