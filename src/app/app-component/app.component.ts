import { Component, OnInit } from '@angular/core';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { DataService } from '../services/data.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  // Font awesome icon
  faBars = faBars;

  cartAmount: number;
  // Declare subscription to keep subscribe
  subscription: Subscription;

  constructor( private service: DataService ){ }

  ngOnInit(){
    this.updateCartAmount();

  }

  updateCartAmount(){
    // Fetch cart items from sessionStorage
    this.cartAmount = this.service.getSessionCartItems().length;
    // Catch and subscribe when "numberOfCartItem" in dataService is updated
    this.subscription = this.service.numberOfCartItems$.subscribe(
      amount => {
        this.cartAmount = amount;
      }
    );
  }

}
