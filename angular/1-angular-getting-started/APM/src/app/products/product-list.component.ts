// we used this component as a directive in the app component by adding this component's selector, pm-products, as a directive in the containing component's template (app component's template), and by declaring this component in the app's angular module (main module, called app.module.ts)

import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { IProduct } from './product';
import { ProductService } from './product.service';

@Component({
  selector: 'pm-products',
  templateUrl: './product-list.component.html',
  // We use the "styles" or "styleUrls" properties of the @Component decorator to encapsulate unique styles for a component
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent implements OnInit, OnDestroy {
  pageTitle: string = 'Product List';
  imageWidth: number = 50;
  imageMargin: number = 2;
  showImage: boolean = false;
  errorMessage: string = '';
  // adding the ! after the variable name means we will assign it at some point later
  sub!: Subscription;

  // listFilter: string = 'cart';
  private _listFilter: string = '';
  get listFilter(): string {
    return this._listFilter;
  }
  set listFilter(value: string) {
    this._listFilter = value;
    console.log('In setter: ', value);
    this.filteredProducts = this.performFilter(value);
  }

  filteredProducts: IProduct[] = [];

  // products: any[] = [];
  products: IProduct[] = [];

  // Longer way of injecting a service
  // private _productService;
  // constructor(productService: ProductService) {
  //   this._productService = productService;
  // }
  // shorter syntax of injecting a service as a dependency
  constructor(private productService: ProductService) {}

  // performFilter() takes in the list filter which is a string and returns the filtered array of IProduct types
  performFilter(filterBy: string): IProduct[] {
    filterBy = filterBy.toLowerCase();
    return this.products.filter((product: IProduct) =>
      product.productName.toLocaleLowerCase().includes(filterBy)
    );
  }

  ngOnInit(): void {
    console.log('In OnInit');
    // this.listFilter = 'cart';
    // We subscribe to the returned observable, passing in observer object
    // the obs obj provides functions for responding to our 3 notifications: next, error, complete
    this.sub = this.productService.getProducts().subscribe({
      next: (products) => {
        this.products = products;
        this.filteredProducts = this.products;
      },
      error: (err) => (this.errorMessage = err),
    });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  toggleImage(): void {
    this.showImage = !this.showImage;
  }

  onRatingClicked(message: string): void {
    this.pageTitle = 'Product List ' + message;
  }
}
