import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Product } from '../models/product.model';
import {
  BehaviorSubject,
  filter,
  startWith,
  Subject,
  switchMap,
  tap,
} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  private url = 'api/products';

  private http = inject(HttpClient);

  private refreshSubject = new Subject<void>();

  private selectedIdSubject = new BehaviorSubject('');
  readonly selectedId$ = this.selectedIdSubject.asObservable();

  selectId(id: string) {
    this.selectedIdSubject.next(id);
  }

  product$ = this.selectedId$.pipe(
    filter((id) => !!id),
    switchMap((id: any) => this.http.get<Product>(this.url + '/' + id))
  );
  products$ = this.refreshSubject.pipe(
    startWith(null),
    switchMap(() => this.http.get<Product[]>(this.url)),
    tap((x) => console.log(x))
  );

  addProduct(product: Product) {
    return this.http
      .post<Product>(this.url, product)
      .pipe(tap(() => this.refreshSubject.next()));
  }

  editProduct(product: Product) {
    return this.http
      .put(this.url + '/' + product.id, product)
      .pipe(tap(() => this.refreshSubject.next()));
  }

  deleteProduct(id: string) {
    return this.http
      .delete(this.url + '/' + id)
      .pipe(tap(() => this.refreshSubject.next()));
  }
}
