import { Observable } from 'rxjs';
import { IProduct } from './iproduct'
import { IPlacedOrders } from './iplaced-orders';
import { IOrder } from './iorder';
import { ICategory } from './icategory';

export interface IdataService {
    onNotifyCartAmoutUpdated(updated: number):any;
    getData():Observable<IProduct[]>;
    getDetailById(id: number): Observable<IProduct>;
    getSessionCartItems():IProduct[];
    addToCart(cartItems: IProduct[]): void;
    RemoveFromSessionStorage(item: number):void;
    getOrders(): Observable<IPlacedOrders[]>;
    getSessionUserData():void;
    // To be tested by e2e test
    // submitOrder(order: IOrder): Observable<IOrder>;
    searchProductApi(Query: string):Observable<IProduct[]>;
    getCategory():Observable<ICategory[]>;
    getOrders(): Observable<IPlacedOrders[]>;
    getOrderDetailById(id: number): Observable<IPlacedOrders>;
    // No need
    // updateOrders(id:number, updateOrder:IPlacedOrders): Observable<IPlacedOrders>;
    deleteOrder(id:number): Observable<IPlacedOrders>;
}
