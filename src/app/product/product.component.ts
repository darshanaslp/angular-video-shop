import { Component, OnInit } from "@angular/core";
import { DataService } from "../services/data.service";
import { ActivatedRoute } from "@angular/router";
import { Location } from "@angular/common";
import { IProduct } from "../interfaces/iproduct";
import { Router } from "@angular/router";
import { ICategory } from "../interfaces/icategory";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { notifyModalContent } from "../notify-dialog/notify-dialog.component";
import { forkJoin } from "rxjs";

@Component({
  selector: "app-product",
  templateUrl: "./product.component.html",
  styleUrls: ["./product.component.scss"]
})
export class ProductComponent implements OnInit {
  details: IProduct;
  categoryResults: ICategory[] = [];

  // To check if product already exists in sessionStorage
  cartItems: IProduct[] = [];

  constructor(
    private route: ActivatedRoute,
    private service: DataService,
    private router: Router,
    private location: Location,
    private modalService: NgbModal
  ) {}

  ngOnInit() {
    // Get the property params 'id' from product.component, and copies the data into myParams. Use this id to collect the item with the same id from API.
    // variable name must be matched with the one in activatedRouteStub
    this.route.paramMap.subscribe(myParams => {
      // + is to convert to number (the same as parsInt)
      const id = +myParams.get("id");
      this.getDetails(id);
    });
  }

  getDetails(id: number) {
    forkJoin(
      this.service.getDetailById(id),
      this.service.getCategory()
    ).subscribe(
      response => {
        this.details = response[0];
        const categories = response[1];
        for (var j = 0; j < this.details.productCategory.length; j++) {
          for (var i = 0; i < categories.length; i++) {
            if (categories[i].id === this.details.productCategory[j].categoryId) {
              this.categoryResults.push(categories[i]);
            }
          }
        }
      },
      error => console.log(error),
      () => console.log("HPPT request for movie details completed")
    );
  }

  addToCart(): void {
    // Fetch cart items from sessionStorage
    this.cartItems = this.service.getSessionCartItems();

    let isDuplicate = false;

    // Check if the product is already in the cart
    for (var i = 0; i < this.cartItems.length; i++) {
      // If there is the same product in the cart mark as duplicate
      if (this.details.id === this.cartItems[i].id) {
        isDuplicate = true;
      }
    }
    // If there is no same component in the cart(or cart is empty) add to the cart
    if (!isDuplicate) {
      this.addSessionStorage();
      // Otherwise show error dialog
    } else {
      this.errorDialog();
    }
  }

  // add sessionStorage and move to cart page
  addSessionStorage() {
    this.cartItems.push(this.details);
    this.service.addToCart(this.cartItems);
    this.router.navigate(["/cart"]);
    // Trigger to update cart amount in app.component (header)
    let numberOfCartItems = this.cartItems.length;
    this.service.onNotifyCartAmoutUpdated(numberOfCartItems);
  }

  // Show error dialog
  errorDialog() {
    window.alert('This product is already in the cart!');
  //   const modalRef = this.modalService.open(notifyModalContent, {
  //     centered: true
  //   });
  //   modalRef.componentInstance.name = "This product is already in the cart!";
  }

  // Back to previous page
  goBack(): void {
    this.location.back();
  }
}
