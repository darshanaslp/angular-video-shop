import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderSentComponent } from './order-sent.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { DataService } from '../services/data.service';
import { MockDataService } from '../services/mock-data.service';

describe('OrderSentComponent', () => {
  let component: OrderSentComponent;
  let fixture: ComponentFixture<OrderSentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderSentComponent ],
      imports: [HttpClientModule, RouterTestingModule]
    })
    //Override component's own provider to test with MockData.service
    .overrideComponent(OrderSentComponent, {
      set: {
        providers: [
          { provide: DataService, useClass: MockDataService }
        ]
      }
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderSentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
