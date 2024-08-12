import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Product } from './models/product.model';

@Injectable({
  providedIn: 'root',
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const products: Product[] = [
      { id: '1', name: 'Telefon', price: 250 },
      { id: '2', name: 'PC', price: 570 },
      { id: '3', name: 'TV', price: 320 },
    ];

    return { products };
  }
}
