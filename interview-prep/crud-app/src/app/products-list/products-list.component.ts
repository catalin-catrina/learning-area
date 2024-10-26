import { Component, inject } from '@angular/core';
import { ProductsService } from '../services/products.service';
import { AsyncPipe, CommonModule } from '@angular/common';
import { tap } from 'rxjs';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-products-list',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, AsyncPipe],
  templateUrl: './products-list.component.html',
  styleUrl: './products-list.component.css',
})
export class ProductsListComponent {
  toggleId = false;

  productsService = inject(ProductsService);

  products$ = this.productsService.products$;
  selectedId$ = this.productsService.selectedId$;

  selectId(id: string, event: Event) {
    event.stopPropagation();
    this.productsService.selectId(id);
  }

  handleToggle() {
    this.toggleId = !this.toggleId;
  }

  deleteProduct(id: string) {
    this.productsService.deleteProduct(id).subscribe();
  }
}
