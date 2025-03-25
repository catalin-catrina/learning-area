import { Component, inject } from '@angular/core';
import { ProductsService } from '../../services/products.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductsFilterComponent } from '../products-filter/products-filter.component';

@Component({
  standalone: true,
  selector: 'app-products-list',
  imports: [ProductsFilterComponent],
  templateUrl: './products-list.component.html',
  styleUrl: './products-list.component.scss',
})
export class ProductsListComponent {
  private router = inject(Router);
  private activatedRoute = inject(ActivatedRoute);
  private productsService = inject(ProductsService);

  products = this.productsService.productsData;
  productsError = this.productsService.productsError;

  onProductClicked(id: number): void {
    this.router.navigate([id], { relativeTo: this.activatedRoute });
  }
}
