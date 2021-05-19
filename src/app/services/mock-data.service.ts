import { Injectable } from '@angular/core';
import { IdataService } from '../interfaces/idata-service';
import { IProduct } from '../interfaces/iproduct';
import { IUser } from '../interfaces/iuser';
import { Observable, of, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { ICategory } from '../interfaces/icategory';
import { IPlacedOrders } from '../interfaces/iplaced-orders';
import { IOrder } from '../interfaces/iorder';
import { IStatus } from '../interfaces/Ichoices';

@Injectable({
  providedIn: 'root'
})
export class MockDataService implements IdataService{

  // Temporary cartItems to store instead of sessionStorage
  itemsInSessionStorage: IProduct[] = [];
  userData: IUser;
  orders: IPlacedOrders[] = [];
  searchResults: IProduct[];
  totalCost = 0;
  userDataMock: IUser;


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

    // Product data to run a test instead of API data
  products: IProduct[] = [
    {
      id: 76,
      name: "The Dark Knight",
      description: "When the menace",
      price: 199,
      imageUrl: "https://images-na.ssl-images-amazon.com/jpg",
      year: 2008,
      added:"2016-01-05T00:00:00",
      productCategory: [{categoryId:5, category:null},{categoryId:6, category:null}]
    },
    {
      id: 77,
      name:"Interstellar",
      description: "A team of explorers",
      price :129,
      imageUrl:"https://images-na.ssl-images-amazon.com/",
      year :2014,
      added:"2017-07-16T00:00:00",
      productCategory:[{categoryId:8,category:null}]}
  ];

  categoryDataMock: ICategory[] = [
    {id:5, name :"Action"},
    {id:6, name :"Comedy"},
  ];

  orderDataMock: IPlacedOrders[] = [
    {id:558, companyId:25, created:"2019-04-01", createdBy :"Kaori", paymentMethod:'Paypal', totalPrice :100, status:0, orderRows :[{id:1, productId:79, product: "null", amount:1, orderId: 11}]},
    {id:559, companyId:25, created:"2019-05-02", createdBy :"Kaori", paymentMethod:'Paypal', totalPrice :200, status:0, orderRows :[{id:1, productId:78, product: "null", amount:1, orderId: 11}]},
    {id:560, companyId:25, created:"2019-05-03", createdBy :"Kaori", paymentMethod:'Paypal', totalPrice :300, status:0, orderRows :[{id:1, productId:80, product: "null", amount:1, orderId: 11}]},
  ];

  orderHttpClientMock: IOrder[] = [
    {id:558, companyId:25, created:"2019-04-01", createdBy :"Kaori", paymentMethod:'Paypal', totalPrice :100, status:0, orderRows :[{ProductId:79, Amount:1, Id: 100}]},
    {id:559, companyId:25, created:"2019-05-02", createdBy :"Kaori", paymentMethod:'Paypal', totalPrice :200, status:0, orderRows :[{ProductId:78, Amount:1, Id: 101}]},
    {id:560, companyId:25, created:"2019-05-03", createdBy :"Kaori", paymentMethod:'Paypal', totalPrice :300, status:0, orderRows :[{ProductId:80, Amount:1, Id: 102}]},

  ];

  // Return product array above as Observable<Iproduct[]>
  getData():Observable<IProduct[]>{
    return of(this.products);
  }

  getDetailById(id: number): Observable<IProduct>{
    return this.getData().pipe(map(details =>
      details.find(detail=>detail.id == id)));
  }

  // To check how many items in a shopping cart
  getSessionCartItems():IProduct[] {
    return this.itemsInSessionStorage = this.products;

  }

  addToCart(cartItems: IProduct[]): void {
    return sessionStorage.push(cartItems);
  }

  RemoveFromSessionStorage(item: number) {
    for (let i = 0; i < this.itemsInSessionStorage.length; i++) {
      if(this.itemsInSessionStorage[i].id === item){
        this.itemsInSessionStorage.splice(i, 1);
      }
    }

    return this.itemsInSessionStorage;
  }

  // ||[]creates array if cartItem is empty
  getSessionUserData() {
    return this.userData = {
      firstName:"Kaori", email:"kaori.yoshimura@medieinstitutet.se", paymentMethod:'Paypal', phoneNumber:555222, phoneNumbers:2222
    };
  }

  searchProductApi(Query: string):Observable<IProduct[]>{
    this.searchResults = this.products.filter(eachItem => eachItem.name.includes(Query));
    return of(this.searchResults)
  }

  getCategory():Observable<ICategory[]>{
    return of(this.categoryDataMock);
  }

  getOrders(): Observable<IPlacedOrders[]>{
    return of(this.orderDataMock);
  }


  getOrderDetailById(id: number): Observable<IPlacedOrders> {
    return this.getOrders().pipe(map(orderDetails =>
      orderDetails.find(detail=>
        detail.id == id)
    ));
  }

  // updateOrders(id:number, updateOrder:IPlacedOrders): Observable<IPlacedOrders>{
  //   return this.http.put<IPlacedOrders>('https://medieinstitutet-wie-products.azurewebsites.net/api/orders?companyId=25' + '/{' + id + '}', updateOrder, httpOptions);
  // }

  deleteOrder(id:number) : Observable<IPlacedOrders> {
    for (let i = 0; i < this.orderDataMock.length; i++) {
      if(this.orderDataMock[i].id === id){
        let removedElements = this.orderDataMock.splice(i, 1);
    // Return as observable so that it can match with IProduct interface
        return of(removedElements[0]);
      }
    }

  }

  constructor() { }
}
