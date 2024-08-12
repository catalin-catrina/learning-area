import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Product } from '../models/product.model';
import { v4 as uuidv4 } from 'uuid';
import { ProductsService } from '../services/products.service';
import { AsyncPipe, CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-add',
  standalone: true,
  imports: [FormsModule, CommonModule, AsyncPipe],
  templateUrl: './product-add.component.html',
  styleUrl: './product-add.component.css',
})
export class ProductAddComponent {
  product: Product = { id: uuidv4(), name: '', price: null };

  productsService = inject(ProductsService);
  products$ = this.productsService.products$;

  addProduct(product: Product) {
    this.productsService
      .addProduct(product)
      .subscribe(() => this.resetProduct());
  }

  resetProduct() {
    this.product = { id: uuidv4(), name: '', price: null };
  }
}
