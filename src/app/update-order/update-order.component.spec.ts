import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateOrderComponent } from './update-order.component';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { DataService } from '../services/data.service';
import { MockDataService } from '../services/mock-data.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRouteStub } from '../product/testing/activatedRouteStub';
import { ActivatedRoute } from '@angular/router';

describe('UpdateOrderComponent', () => {
  let component: UpdateOrderComponent;
  let fixture: ComponentFixture<UpdateOrderComponent>;

  // Specify the id which is in ngOnInit (it can't be specified in test function)
  const activatedRouteStub = new ActivatedRouteStub({ id : 558})

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [{ provide: ActivatedRoute, useValue: activatedRouteStub }],
      declarations: [ UpdateOrderComponent ],
      imports: [
        HttpClientModule,
        RouterTestingModule,
        FormsModule,
        ReactiveFormsModule
      ]
    })
    //Override component's own provider
    .overrideComponent(UpdateOrderComponent, {
      set: {
        providers: [
          { provide: DataService, useClass: MockDataService }
        ]
      }
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get product list data to show product name', () => {
    // this function is in ngOnInit
    expect(component.products.length).toBe(2);
  });

  it('should get order details data by order ID', () => {
    // this function is in ngOnInit
    expect(component.orderDetails).toBeDefined();
    expect(component.orderDetails.id).toBe(558);
  });

  it('should set formBuilder', () => {
  // this function is in ngOnInit
    expect(component.updateOrderForm).toBeDefined();
    expect(component.updateOrderForm.controls["payment"]).toBeDefined();

  });

  it('should set Items FormArray', () => {
    // this function is in ngOnInit
    expect(component.updateOrderForm).toBeDefined();
  });

  it(`Should create orderRows for update when update btn is clicked`, () => {
  //   let items = component.updateOrderForm.value.items([]);
  //   items[0].setValue([79, 1, 1011]);

  //   expect(component.updateOrderRows.length).toBe(0);
  //   component.createUpdateOrderRows();
  //   expect(component.updateOrderRows[0].ProductId).toBe(79);
  //   expect(component.orderRows.length).toBe(1);
  });

  it('should remove a order from database', () => {
    expect(component.orderDetails.id).toBe(558);
    component.deleteOrder(component.orderDetails.id);
    expect(component.orderDetails).toBeUndefined();
  });

});
