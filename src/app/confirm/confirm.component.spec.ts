import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmComponent } from './confirm.component';

import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { DataService } from '../services/data.service';
import { MockDataService } from '../services/mock-data.service';

describe('ConfirmComponent', () => {
  let component: ConfirmComponent;
  let fixture: ComponentFixture<ConfirmComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfirmComponent ],
      imports: [HttpClientModule, RouterTestingModule]
    })
    //Override component's own provider to test with MockData.service
    .overrideComponent(ConfirmComponent, {
      set: {
        providers: [
          { provide: DataService, useClass: MockDataService }
        ]
      }
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show cart items', () => {
    // test if getCartItems() works (do not need to write function and run because it is in ngOnInit)
    expect(component.cartItems.length).toBe(2);
  });

  it(`Should caluculate and show total cost`, () => {
    // caluculateCost() function is in ngOnInit
    expect(component.totalCost).toBe(199+129);
  });

  it(`Should show user info`, () => {
    // getUserData() function is in ngOnInit
    expect(component.userData).toBeDefined();
    expect(component.userData.firstName).toBe('Kaori');
  });

  it(`Should create orderRows`, () => {
    expect(component.orderRows.length).toBe(0);
    component.createOrderRows();
    expect(component.orderRows[0].ProductId).toBe(76);
    expect(component.orderRows.length).toBe(2);
  });

  it(`Should create orders`, () => {
  component.createOrderRows();
  expect(component.orders).toBeUndefined();
  component.createOrders();
  expect(component.orders).toBeDefined();
  expect(component.orders.companyId).toBe(25);
  });

});
