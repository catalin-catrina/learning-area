import { computed, Injectable, signal } from '@angular/core';
import { CartItem } from './cart';
import { Product } from '../products/product';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  cartItems = signal<CartItem[]>([]);

  cartCount = computed(() =>
    this.cartItems().reduce((prev, curr) => prev + curr.quantity, 0)
  );

  subTotal = computed(() =>
    this.cartItems().reduce(
      (acc, val) => acc + val.product.price * val.quantity,
      0
    )
  );
  deliveryFee = computed(() => (this.subTotal() < 50 ? 5.99 : 0));
  tax = computed(() => Math.round(this.subTotal() * 10.75) / 100);
  totalPrice = computed(
    () => this.subTotal() + this.deliveryFee() + this.tax()
  );

  addProduct(product: Product): void {
    this.cartItems.update((items) => {
      const existingItem = items.find((item) => item.product.id === product.id);
      if (existingItem) {
        return items.map((item) =>
          item.product.id === existingItem.product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...items, { product, quantity: 1 }];
      }
    });
  }

  updateQuantity(cartItem: CartItem, quantity: number) {
    this.cartItems.update((items) =>
      items.map((item) =>
        item.product.id === cartItem.product.id ? { ...item, quantity } : item
      )
    );
  }

  deleteProduct(cartItem: CartItem): void {
    this.cartItems.update((items) =>
      items.filter((item) => item.product.id !== cartItem.product.id)
    );
  }
}
