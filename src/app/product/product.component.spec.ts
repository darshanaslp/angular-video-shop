import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductComponent } from './product.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { DataService } from '../services/data.service';
import { MockDataService } from '../services/mock-data.service';
import { notifyModalContent } from '../notify-dialog/notify-dialog.component';
import { ActivatedRouteStub } from './testing/activatedRouteStub';
import { ActivatedRoute } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';


describe('ProductComponent', () => {
  let component: ProductComponent;
  let fixture: ComponentFixture<ProductComponent>;

  // Specify the id which is in ngOnInit (it can't be specified in test function)
  const activatedRouteStub = new ActivatedRouteStub({ id : 76})

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [{ provide: ActivatedRoute, useValue: activatedRouteStub }],
      declarations: [ ProductComponent, notifyModalContent ],
      imports: [ HttpClientModule, RouterTestingModule ]
    })
        //Override component's own provider to test with MockData.service
        .overrideComponent(ProductComponent, {
          set: {
            providers: [
              { provide: DataService, useClass: MockDataService },
              { provide: NgbActiveModal, useClass: NgbActiveModal }
            ]
          }
        })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show details', () => {
    expect(component.details).toBeDefined();
    expect(component.details.name).toBe('The Dark Knight');
  });

  it('should show category', () => {

    expect(component.categoryResults.length).toBe(2);
  });

  it('should add items into the array for sessionStorage', () => {
    expect(component.cartItems.length).toBe(0);
    component.addToCart();
    // There is already one item in cartafter getSessionCartItems function. Plus add one item => toBe(2)
    expect(component.cartItems.length).toBe(2);
    component.addToCart();
    // If there is already the same product in SC it won't be added.
    expect(component.cartItems.length).toBe(2);
  });

});
