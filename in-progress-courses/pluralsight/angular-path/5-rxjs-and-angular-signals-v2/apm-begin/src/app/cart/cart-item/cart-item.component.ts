import { Component, computed, inject, Input, signal } from '@angular/core';
import { CurrencyPipe, NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { CartItem } from '../cart';
import { CartService } from '../cart.service';

@Component({
  selector: 'sw-cart-item',
  standalone: true,
  imports: [CurrencyPipe, FormsModule, NgFor, NgIf],
  templateUrl: './cart-item.component.html',
})
export class CartItemComponent {
  @Input({ required: true }) set cartItem(val: CartItem) {
    this.cartItemSignal.set(val);
  }

  cartItemSignal = signal<CartItem>(undefined!);

  exPrice = computed(
    () => this.cartItemSignal().quantity * this.cartItemSignal().product.price
  );

  // Quantity available (hard-coded to 8)
  // Mapped to an array from 1-8
  qtyArr = computed(() =>
    [...Array(this.cartItemSignal().product.quantityInStock).keys()].map((x) => x + 1)
  );

  private cartService = inject(CartService);

  onQuantitySelected(quantity: number): void {
    this.cartService.updateQuantity(this.cartItemSignal(), Number(quantity));
  }

  removeFromCart(): void {
    this.cartService.deleteProduct(this.cartItemSignal());
  }
}
