import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryComponent } from './category.component';

describe('CategoryComponent', () => {
  let component: CategoryComponent;
  let fixture: ComponentFixture<CategoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CategoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoryComponent);
    component = fixture.componentInstance;
    // Create the mock for input
    component.categoryInput = {id:1, name:"commedy"};
    fixture.detectChanges();
  });

  it('should create and show category name', () => {
    expect(component).toBeTruthy();
  });

  it('should emit on click and trigger filtering product by category', () => {
    // Call EventEmitter and check if it has been called
    spyOn(component.categoryEvent, 'emit');
    component.filterByCategory();
    expect(component.categoryEvent.emit).toHaveBeenCalled();
  });

});
