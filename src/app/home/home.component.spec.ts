import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeComponent } from './home.component';
import { DataService } from '../services/data.service';
import { MockDataService } from '../services/mock-data.service';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule } from '@angular/forms';
import { SearchComponent } from './search/search.component';
import { CategoryComponent } from './category/category.component';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  // Call testBed methods within a beforeEach() to ensure a fresh start before each indivisual test
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule, RouterTestingModule, FormsModule],
      declarations: [ HomeComponent, SearchComponent, CategoryComponent ]
    })

    //Override component's own provider
    .overrideComponent(HomeComponent, {
      set: {
        providers: [
          { provide: DataService, useClass: MockDataService }
        ]
      }
    })
    .compileComponents();
    }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should print out all products',() => {
    expect(component.products.length).toBe(2);
  });

  it('should search', ()=> {
    expect(component.searchResults).toBeUndefined();
    component.searchProduct('Dark');
    expect(component.searchResults.length).toBe(1);
  });

  it('should print out category list',() => {
    expect(component.categories.length).toBe(2);
  });

  it('should filter by category',() => {
    expect(component.categoryResults.length).toBe(0);
    component.showProductsByCategory(5);
    expect(component.categoryResults.length).toBe(1);
  });

});
