import { Component, OnInit } from "@angular/core";
import { DataService } from "../services/data.service";
import { IPlacedOrders, IPlacedOrderRow } from "../interfaces/iplaced-orders";
import { ActivatedRoute, Router } from "@angular/router";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FormBuilder, FormArray, FormGroup } from "@angular/forms";
import { IOrder, IOrderRow } from "../interfaces/iorder";
import { IProduct } from "../interfaces/iproduct";
import { IStatus } from "../interfaces/Ichoices";
import { forkJoin } from "rxjs";

@Component({
  selector: "app-update-order",
  templateUrl: "./update-order.component.html",
  styleUrls: ["./update-order.component.scss"]
})
export class UpdateOrderComponent implements OnInit {
  // Fontawesome icon
  faTrash = faTrash;

  orderDetails: IPlacedOrders;
  updateTotalCost: number;
  products: IProduct[];
  productNames: string[] = [];
  totalPrice: number;

  // Declare FormGroup
  updateOrderForm: FormGroup;
  // Fetch choices for payement in checkout and update order page
  paymentChoices = this.service.paymentChoices;
  // Fetch choices for status in checkout and update order page
  statusChoices: IStatus[] = this.service.statusChoices;

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private service: DataService
  )
  {}

  ngOnInit() {
    // Get the property params 'id' from admin.component, and copies the data into myParams. Use this id to collect the item with the same id from API.
    // variable name must be matched with the one in activatedRouteStub
    this.route.paramMap.subscribe(myParams => {
      // + is to convert to number (the same as parsInt)
      const id = +myParams.get("id");
      this.getOrderDetails(id);
    });
  }

  getOrderDetails(id: number) {
    // Fetch both product list and order details from API
    forkJoin(
      this.service.getData(), //To get product name
      this.service.getOrderDetailById(id) // To get order details
    ).subscribe(
      res => {
        // Store results into variables
        this.products = res[0];
        this.orderDetails = res[1];

        // Set FormBuilder
        this.setFormBuilder();

        // Get product names of items in orderRows
        this.getProductName();

        // Set items FormArray
        this.setItemsFormArray();
      },
      error => console.log(error),
      () => console.log("HPPT request for getData and getOrderDetails completed")
    );
  }

  setFormBuilder() {
    this.updateOrderForm = this.fb.group({
      payment: this.orderDetails.paymentMethod,
      status: this.orderDetails.status,
      items: this.fb.array([])
    });
  }

  // Set items FormArray
  setItemsFormArray() {
    for (let i = 0; i < this.orderDetails.orderRows.length; i++) {
      const items = this.fb.group({
        id: this.orderDetails.orderRows[i].id,
        productId: this.orderDetails.orderRows[i].productId,
        productName: this.productNames[i],
        amount: this.orderDetails.orderRows[i].amount
      });
      // Push formGroup into FormArray
      (<FormArray>this.updateOrderForm.get("items")).push(items);
    }
  }

  // Fetch product names from product list
  getProductName(): Array<string> {
    for (var j = 0; j < this.orderDetails.orderRows.length; j++) {
      for (var i = 0; i < this.products.length; i++) {
        if (this.orderDetails.orderRows[j].productId === this.products[i].id) {
          this.productNames.push(this.products[i].name);
        }
      }
    }
    return this.productNames;
  }

  // Collect updated date of orderRows and store
  createUpdateOrderRows(): IOrderRow[] {
    const updateOrderRows:IOrderRow[] = [];
    for (var i = 0; i < this.updateOrderForm.value.items.length; i++) {
      updateOrderRows.push({
        ProductId: this.updateOrderForm.value.items[i].productId,
        Amount: this.updateOrderForm.value.items[i].amount,
        Id: this.updateOrderForm.value.items[i].id
      });
    }
    return updateOrderRows;
  }

  // Caluculate total price of new orderRows
  caluculateTotalPrice(): number {
    let price = 0;
    for (var j = 0; j < this.createUpdateOrderRows.length; j++) {
      for (var i = 0; i < this.products.length; i++) {
        if (this.createUpdateOrderRows[j].ProductId === this.products[i].id) {
          price += this.products[i].price * this.createUpdateOrderRows[j].Amount;
        }
      }
    }
    console.log("total price", price);
    return price;
  }

  // Send put request
  updateOrder(id: number) {

    this.createUpdateOrderRows();
    console.log("updateOrderRows", this.createUpdateOrderRows);

    console.log("updateOrderRows", this.caluculateTotalPrice());

    // Fetch product list and create updated order
    this.service.getData().subscribe(
      response => {
        // Store product data
        this.products = response;
        // Store all info into an object to send to API
        const updateOrderDetails: IOrder = {
          id: this.orderDetails.id,
          companyId: 25,
          created: this.orderDetails.created,
          createdBy: this.orderDetails.createdBy,
          paymentMethod: this.updateOrderForm.value.payment, //From FromGroup
          totalPrice: this.caluculateTotalPrice(),
          status: this.updateOrderForm.value.status, //From FromGroup
          orderRows: this.createUpdateOrderRows()
        };

      console.log("To API", updateOrderDetails);

      // Send update request to API
      this.service.updateOrders(id, updateOrderDetails).subscribe(
        response => console.log(response),
        err => console.log(err.message),
        () => console.log("Update order completed")
      );

      },
      error => console.log(error),
      () => console.log("HTTP request for getMovie completed")
    );

    // Fetch the order details again
    this.getOrderDetails(id) ;

  }

  deleteOrder(id: number) {
    this.service.deleteOrder(id).subscribe(
      response => {
        console.log(response);
        this.orderDetails = undefined;
      },
      error => console.log(error),
      () => console.log("HPPT request for deleteOrder completed")
    );
  }
}
