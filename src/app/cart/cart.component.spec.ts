import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CartComponent } from './cart.component';

import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { DataService } from '../services/data.service';
import { MockDataService } from '../services/mock-data.service';

describe('CartComponent', () => {
  let component: CartComponent;
  let fixture: ComponentFixture<CartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CartComponent ],
      imports: [
        HttpClientModule,
        RouterTestingModule,
      ]
    })
    //Override component's own provider
    .overrideComponent(CartComponent, {
      set: {
        providers: [
          { provide: DataService, useClass: MockDataService }
        ]
      }
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CartComponent);
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

  it('should caluculate total cost', () => {
    expect(component.totalPrice).toBe(328);
  });

  it('should remove a product from cart', () => {
    expect(component.cartItems.length).toBe(2);
    component.removeFromCart(76);
    expect(component.cartItems.length).toBe(1);
  });

});
