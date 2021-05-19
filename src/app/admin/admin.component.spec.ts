import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminComponent } from './admin.component';
import { DataService } from '../services/data.service';
import { MockDataService } from '../services/mock-data.service';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { MatTableModule, MatPaginatorModule } from '@angular/material';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

describe('AdminComponent', () => {
  let component: AdminComponent;
  let fixture: ComponentFixture<AdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminComponent ],
      imports: [
        HttpClientModule,
        RouterTestingModule,
        MatTableModule,
        MatPaginatorModule,
        FontAwesomeModule
      ]
    })
    //Override component's own provider
    .overrideComponent(AdminComponent, {
      set: {
        providers: [
          { provide: DataService, useClass: MockDataService }
        ]
      }
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should print out placed order list',() => {
    // getOrders() is gnOnInitit
    expect(component.orders.data.length).toBe(3);
  });


});
