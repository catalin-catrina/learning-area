import { Component, inject } from '@angular/core';
import { NgIf, NgFor, NgClass } from '@angular/common';
import { ProductDetailComponent } from '../product-detail/product-detail.component';
import { ProductService } from '../product.service';
import { catchError, EMPTY } from 'rxjs';

@Component({
  selector: 'pm-product-list',
  templateUrl: './product-list.component.html',
  standalone: true,
  imports: [NgIf, NgFor, NgClass, ProductDetailComponent],
})
export class ProductListComponent {
  pageTitle = 'Products';

  private productService = inject(ProductService);

  selectedProduct = this.productService.selectedProduct;

  // readonly products$ = this.productService.products$.pipe(
  //   catchError((err) => {
  //     this.errorMessage = err;
  //     return EMPTY;
  //   })
  // );

  products = this.productService.products;
  errorMessage = this.productService.productsError;

  onSelected(productId: number): void {
    this.productService.selectProduct(productId);
  }
}
