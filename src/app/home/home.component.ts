import { Component, OnInit } from '@angular/core';
import { IProduct } from '../interfaces/iproduct';
import { DataService } from '../services/data.service';
import { ICategory } from '../interfaces/icategory';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  products: IProduct[];
  allProducts: IProduct[];
  searchResults: IProduct[];
  categoryResults: IProduct[] = [];
  categories: ICategory[];
  categoryid:number;


  // Inject the class of DataService
  constructor(private service:DataService) { }

  ngOnInit() {
    this.getCategory();
    this.getMovie();
  }

  getMovie(){
    this.service.getData().subscribe(
      response => {
        this.products = response;
        this.allProducts = response;
      },
      error => console.log(error),
      () => console.log('HTTP request for getMovie completed')
    );
  }

  isSearchResultsExist() {
    if(this.searchResults && this.searchResults.length){
      this.products = this.searchResults;
    } else {
      this.products = this.allProducts;
    }
  }

  searchProduct(QueryFromInput:string){
      this.service.searchProductApi(QueryFromInput).subscribe(
        response => {
          this.searchResults = response;
          this.isSearchResultsExist();
        },
        error => console.log(error),
        () => console.log('HTTP request for search completed')
    );
  }

  getCategory(){
    this.service.getCategory().subscribe(
      response => this.categories = response,
      error => console.log(error),
      () => console.log('HPPT request for category completed')
    );
  }

  showProductsByCategory(id:number){
    // Empty categoryResults array
    this.categoryResults = [];

    for(var i=0; i<this.allProducts.length; i++){
      for(var j=0; j<this.allProducts[i].productCategory.length; j++){
        if(this.allProducts[i].productCategory[j].categoryId === id){
          this.categoryResults.push(this.allProducts[i]);
        }
      };
    }
    return this.products = this.categoryResults;
  }

}
