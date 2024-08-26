import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Product } from '../product.model';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-products-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.css'],
})
export class ProductsListComponent {
  @Input() products: Product[] | null = [];
  @Input() total: number | null = 0;
  @Input() showProductCode: boolean | null = false;
  @Output() toggleProductCode = new EventEmitter<void>();
}
