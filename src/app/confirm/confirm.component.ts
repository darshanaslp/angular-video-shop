import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { IProduct } from '../interfaces/iproduct';
import { IUser } from '../interfaces/iuser';
import { IOrder, IOrderRow } from '../interfaces/iorder';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import * as moment from 'moment';

@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.scss']
})
export class ConfirmComponent implements OnInit {
  cartItems: IProduct[];
  totalCost = 0;
  userData: IUser;

  constructor(
    private service: DataService,
    private location: Location,
    private router: Router
    ) { }

  ngOnInit() {
    this.getCartItems();
    this.getUserData();
    this.caluculateCost();
  }

  // Show cart items
  getCartItems(){
    this.cartItems = this.service.getSessionCartItems();
  }

  // Show total cost
  caluculateCost(){
    for (let i = 0; i <this.cartItems.length; i++){
      this.totalCost += this.cartItems[i].price;
    }
    return this.totalCost;
}

  // Show billing information
  getUserData(){
    this.userData = this.service.getSessionUserData();
  }

  // Collect cart items and store in an object to use for order
  // Define public variable instead of const for test
  orderRows: IOrderRow[] = [];
  createOrderRows():IOrderRow[]{
    for(var i=0; i<this.cartItems.length; i++){
      this.orderRows.push(
        {ProductId: this.cartItems[i].id, Amount: 1, Id: 0}
        );
    }
    return this.orderRows;
  }

  // Define public variable instead of const for test
  orders: IOrder;
  createOrders():IOrder{
    this.orders = {
      id: 0,
      companyId: 25,
      created: moment().format('LLLL'),
      createdBy: this.userData.email,
      paymentMethod: this.userData.paymentMethod,
      totalPrice:this.totalCost,
      status: 0,
      orderRows: this.createOrderRows()
    };

    return this.orders;
  }

  orderSubmit() {
    this.service.submitOrder(this.createOrders()).subscribe(
      response => {console.log(response);},
      err => {console.log(err.message);},
      () => { console.log('completed');}
    );

    // Clean sessionStorage after submitting
    sessionStorage.clear();
    // Trigger to update cart amount in header
    this.service.onNotifyCartAmoutUpdated(0);
    // Move to ordersent page
    this.router.navigate(['/ordersent']);
  }

   // Back to previous page
  goBack(): void {
    this.location.back();
  }
}
