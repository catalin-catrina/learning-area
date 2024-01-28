import { Component, OnDestroy, OnInit } from '@angular/core';
import { IProduct } from './product';
import { ProductService } from './product.service';
import { Subscription } from 'rxjs';

@Component({
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent implements OnInit, OnDestroy {
  // long way of injecting a service
  // private _productService;
  // constructor(productService: ProductService) {
  //   this._productService = productService;
  // }
  constructor(private productService: ProductService) {} // short way of injecting a service
  pageTitle: string = 'Product List';
  imageWidth: number = 50;
  imageMargin: number = 2;
  showImage: boolean = false;
  errorMessage: string = '';

  // Typescript uses strict checking which means we have to initialize all variables, != tells TS we're going to surely initialize this variable some time later, an alternative is using | undefined
  sub!: Subscription;
  // sub: Subscription | undefined

  private _listFilter: string = '';
  get listFilter(): string {
    return this._listFilter;
  }
  set listFilter(value: string) {
    this._listFilter = value;
    this.filteredProducts = this.performFilter(value);
  }

  filteredProducts: IProduct[] = [];
  products: IProduct[] = [];

  ngOnInit() {
    // this.productService.getProducts() calls the product service getProducts() method, and with calling subscribe() on it, we kick off the HTTP get request. It then asynchronously receives data and notifications from the observable. We pass in an observer object to the subscribe method, next is the action to take whenever the observable emits an item, with the method parameter being the emited item (products)
    // since http calls are single async operations, only one item is emitted, which is the HTTP response object that was mapped to our product array in the service, so the parameter "products" in the "next" method is our array of products
    this.sub = this.productService.getProducts().subscribe({
      next: (products) => {
        this.products = products;
        this.filteredProducts = this.products;
      },
      error: (err) => (this.errorMessage = err),
    });
    // can also use a shorthand notation if we only pass in the observer with a next method
    // this.sub = this.productService.getProducts().subscribe(products => this.products = products);
    console.log(this.errorMessage);
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  toggleImage() {
    this.showImage = !this.showImage;
  }

  performFilter(filterBy: string): IProduct[] {
    filterBy = filterBy.toLowerCase();
    return this.products.filter((prod: IProduct) =>
      prod.productName.toLowerCase().includes(filterBy)
    );
  }

  onRatingClicked(message: string): void {
    this.pageTitle = 'Product List: ' + message;
  }
}
