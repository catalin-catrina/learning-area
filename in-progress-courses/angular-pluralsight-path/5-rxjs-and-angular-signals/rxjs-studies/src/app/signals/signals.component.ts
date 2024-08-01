import { CommonModule } from '@angular/common';
import { Component, computed, effect, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IProduct } from './IProduct.interface';

@Component({
  selector: 'app-signals',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './signals.component.html',
  styleUrl: './signals.component.css',
})
export class SignalsComponent {
  quantity = signal(1);
  qntAvailable = signal([1, 2, 3, 4, 5, 6]);

  selectedProduct = signal<IProduct>({
    id: 2,
    name: 'Hammer',
    price: 13,
  });

  totalPrice = computed(() => this.quantity() * this.selectedProduct().price);
  color = computed(() => (this.totalPrice() > 50 ? 'green' : 'blue'));

  constructor() {
    effect(() =>
      console.log(
        'This will log every time the quantity signal changes',
        this.quantity()
      )
    );

    this.quantity.update((q) => q * 2);
  }

  onQuantityChange(qty: number) {
    this.quantity.set(qty);
  }
}
