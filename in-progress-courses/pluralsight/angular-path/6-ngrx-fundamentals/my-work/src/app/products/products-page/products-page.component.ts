import { Component, inject } from '@angular/core';
import { sumProducts } from 'src/app/utils/sum-products';
import { Product } from '../product.model';
import { ProductsService } from '../products.service';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { ProductsListComponent } from '../products-list/products-list.component';
import { Store } from '@ngrx/store';
import { toggleShowProductCode } from '../state/products.reducer';

@Component({
  selector: 'app-products-page',
  standalone: true,
  imports: [CommonModule, ProductsListComponent, CurrencyPipe],
  templateUrl: './products-page.component.html',
  styleUrls: ['./products-page.component.css'],
})
export class ProductsPageComponent {
  products: Product[] = [];
  total = 0;
  loading = true;
  showProductCode = false;
  errorMessage = '';

  productsService = inject(ProductsService);
  store = inject(Store);

  constructor() {
    this.store.subscribe((store) => console.log(store));
  }

  ngOnInit() {
    this.getProducts();
  }

  getProducts() {
    this.productsService.getAll().subscribe({
      next: (products) => {
        this.products = products;
        this.total = sumProducts(products);
        this.loading = false;
      },
      error: (error) => (this.errorMessage = error),
    });
  }

  toggleShowProductCode() {
    this.store.dispatch({ type: '[Products Page] Toggle Show Product Code' });
  }
}
