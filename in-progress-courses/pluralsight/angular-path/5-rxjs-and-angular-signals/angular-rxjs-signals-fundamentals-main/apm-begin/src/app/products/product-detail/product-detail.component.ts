import { Component, computed, inject, Input } from '@angular/core';

import { NgIf, NgFor, CurrencyPipe, AsyncPipe } from '@angular/common';
import { Product } from '../product';
import { ProductService } from '../product.service';
import { catchError, EMPTY } from 'rxjs';
import { CartService } from 'src/app/cart/cart.service';

@Component({
  selector: 'pm-product-detail',
  templateUrl: './product-detail.component.html',
  standalone: true,
  imports: [AsyncPipe, NgIf, NgFor, CurrencyPipe],
})
export class ProductDetailComponent {
  private productService = inject(ProductService);
  private cartService = inject(CartService);

  // Product to display
  // product$ = this.productService.product$.pipe(
  //   catchError((err) => {
  //     this.errorMessage = err;
  //     return EMPTY;
  //   })
  // );
  product = this.productService.product;
  errorMessage = this.productService.productError;

  // Set page title
  pageTitle = computed(() =>
    this.product()
      ? `Product detail for ${this.product()?.productName}`
      : 'Product detail'
  );

  addToCart(product: Product) {
    this.cartService.addToCart(product);
  }
}
