import { Component, inject } from '@angular/core';
import { NgIf, NgFor, NgClass, AsyncPipe } from '@angular/common';
import { catchError, EMPTY } from 'rxjs';

import { ProductDetailComponent } from '../product-detail/product-detail.component';
import { ProductService } from '../product.service';

@Component({
  selector: 'pm-product-list',
  templateUrl: './product-list.component.html',
  standalone: true,
  imports: [AsyncPipe, NgIf, NgFor, NgClass, ProductDetailComponent],
})
export class ProductListComponent {
  // Just enough here for the template to compile
  pageTitle = 'Products';

  private productService = inject(ProductService);

  // Products
  products = this.productService.products;
  errorMessage = this.productService.productsError;

  // Selected product id to highlight the entry
  // calling/subscribing to the observable exposed from the behaviorsubject in the product service
  // readonly selectedProductId$ = this.productService.productSelected$;

  // doing the same using signals
  selectedProductId = this.productService.selectedProductIdSignal;

  onSelected(productId: number): void {
    this.productService.productSelected(productId);
  }
}
