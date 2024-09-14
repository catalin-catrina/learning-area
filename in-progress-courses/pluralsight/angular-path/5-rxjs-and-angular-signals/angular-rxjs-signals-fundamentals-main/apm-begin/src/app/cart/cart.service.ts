import { computed, effect, Injectable, signal } from '@angular/core';
import { CartItem } from './cart';
import { Product } from '../products/product';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  cartItems = signal<CartItem[]>([]);

  cartCount = computed(() =>
    this.cartItems().reduce((total, item) => total + item.quantity, 0)
  );
  subTotal = computed(() =>
    this.cartItems().reduce(
      (total, item) => total + item.product.price * item.quantity,
      1
    )
  );
  deliveryFee = computed(() => (this.subTotal() < 50 ? 5.99 : 0));
  tax = computed(() => Math.round(this.subTotal() * 0.175));
  totalPrice = computed(
    () => this.subTotal() + this.deliveryFee() + this.tax()
  );

  addToCart(product: Product): void {
    this.cartItems.update((items) => [
      ...items,
      {
        product: product,
        quantity: 1,
      },
    ]);
  }

  removeFromCart(cartItem: CartItem): void {
    this.cartItems.update((items) => items.filter((item) => item !== cartItem));
  }

  updateQuantity(cartItem: CartItem, quantity: number) {
    this.cartItems.update((items) =>
      items.map((item) =>
        item.product.id === cartItem.product.id ? { ...item, quantity } : item
      )
    );
  }
}
