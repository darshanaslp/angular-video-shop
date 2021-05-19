import { Injectable } from '@angular/core';
import { IdataService } from '../interfaces/idata-service';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { IProduct } from '../interfaces/iproduct';
import { map } from 'rxjs/operators';
import { IUser } from '../interfaces/iuser';
import { IOrder } from '../interfaces/iorder';
import { ICategory } from '../interfaces/icategory';
import { IPlacedOrders } from '../interfaces/iplaced-orders';
import { IStatus } from '../interfaces/Ichoices';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    'Authorization': 'my-auth-token'
  })
};
@Injectable({
  providedIn: 'root'
})
export class DataService implements IdataService{
  cartItems : IProduct[] = [];
  totalCost = 0;
  userData : IUser;
  searchWord: string = "";

  // Inject the HttpClient into an application class in order to activate HttpClient
  constructor(private http: HttpClient) { }

  // Declaration of object and function to update cart amount in app.component
  // Declare subject type property to inform when data is updated
  numberOfCartItems = new Subject<number>();
  // Create observable object from numberOfCartItems object to share the data in app.component
  numberOfCartItems$ = this.numberOfCartItems.asObservable();
  // Pass "updated" data to numberOfCartItems object and .next will fire off an eent that a subscriber will listen in app component.
  onNotifyCartAmoutUpdated(updated: number):any {
    this.numberOfCartItems.next(updated);
  }

  // Choices for payement in checkout and update order page
  paymentChoices: Array<string> = [
    'Paypal',
    'Bank Id',
    'Credit card'
  ]

  // Choices for status in checkout and update order page
  statusChoices: IStatus[] = [
    { id: 0, status: '0: Waiting for payment'},
    { id: 1, status: '1: Paid'},
    { id: 2, status: '2: Pending'}
  ]

  getData():Observable<IProduct[]>{
    return this.http.get<IProduct[]>('https://medieinstitutet-wie-products.azurewebsites.net/api/products');
  }

  getDetailById(id: number): Observable<IProduct> {
    return this.getData().pipe(map(details =>
      details.find(detail=>
        detail.id == id)
    ));
  }

  // ||[]creates array if cartItem is empty
  // If I want to reuse this function in addToCart for id, name, price is highlited. Not good idea?
  getSessionCartItems():IProduct[] {
    return this.cartItems = JSON.parse(sessionStorage.getItem('cartItem'))|| [];
  }

  addToCart(cartItems: IProduct[]): void {
    sessionStorage.setItem('cartItem', JSON.stringify(cartItems));
  }

  RemoveFromSessionStorage(item: number) {
    for (let i = 0; i < this.cartItems.length; i++) {
      if(this.cartItems[i].id === item){
        this.cartItems.splice(i, 1);
      }
    }
    sessionStorage.setItem('cartItem', JSON.stringify(this.cartItems));
  }

  // ||[]creates array if cartItem is empty
  // If I want to reuse this function in addToCart for id, name, price is highlited. Not good idea?
  getSessionUserData() {
    return this.userData = JSON.parse(sessionStorage.getItem('userData'))|| [];
  }

  // Add a new order to the database
  // Call http.post and pass in the URL and order. In order to execute the HPPT post and get the response, use subscribe and take it in our response by using an arrow function.
  submitOrder(order: IOrder): Observable<IOrder> {
    return this.http.post<IOrder>('https://medieinstitutet-wie-products.azurewebsites.net/api/orders', order, httpOptions);
  }

  searchProductApi(Query: string):Observable<IProduct[]>{
    return this.http.get<IProduct[]>('https://medieinstitutet-wie-products.azurewebsites.net/api/search' + '?searchText=' + Query);
  }

  getCategory():Observable<ICategory[]>{
    return this.http.get<ICategory[]>('https://medieinstitutet-wie-products.azurewebsites.net/api/categories');
  }

  getOrders(): Observable<IPlacedOrders[]>{
    return this.http.get<IPlacedOrders[]>('https://medieinstitutet-wie-products.azurewebsites.net/api/orders?companyId=25');
  }

  getOrderDetailById(id: number): Observable<IPlacedOrders> {
    return this.getOrders().pipe(map(orderDetails =>
      orderDetails.find(detail=>
        detail.id == id)
    ));
  }

  updateOrders(id:number, updateOrder:IOrder): Observable<IOrder>{
    return this.http.put<IOrder>('https://medieinstitutet-wie-products.azurewebsites.net/api/orders' + '/' + id, updateOrder, httpOptions);
  }

  deleteOrder(id:number): Observable<IPlacedOrders>{
    return this.http.delete<IPlacedOrders>('https://medieinstitutet-wie-products.azurewebsites.net/api/orders' + '/' + id, httpOptions);
  }

}
