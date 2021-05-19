import { Component, OnInit, ViewChild, ViewChildren, QueryList } from '@angular/core';
import { IPlacedOrders } from '../interfaces/iplaced-orders';
import { DataService } from '../services/data.service';

import { MatTableDataSource, MatPaginator, MatInput } from '@angular/material';
import { faEdit } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  // Fontowesome icon
  faEdit = faEdit;

  // Material Design table
  displayedColumns: string[] = [
    'id', 'OrderedOn', 'orderedBy', 'paymentMethod', 'totalPrice', 'status', 'editOrderItems'
  ];
  orders: MatTableDataSource<IPlacedOrders>;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  // Material Design input
  @ViewChildren(MatInput) matInputs: QueryList<MatInput>;
  public myDates : any = {};

  constructor(
    private service: DataService,
    ) { }

  ngOnInit() {
    this.getOrders();
  }

  getOrders(){
    this.service.getOrders().subscribe(
      response => {
        this.orders = new MatTableDataSource<IPlacedOrders>(response as IPlacedOrders[]);
        this.orders.paginator = this.paginator;
      },
      error => console.log(error),
      () => console.log('HPPT request for getOrders completed')
    );
  }

}
