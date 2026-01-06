import { HttpClient } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';
import {
  catchError,
  filter,
  map,
  Observable,
  of,
  shareReplay,
  switchMap,
  throwError,
} from 'rxjs';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { environment } from '../../../environments/environment';
import { Filters } from '../models/filters.interface';
import { HttpErrorService } from '../../../core/services/http-error.service';
import { Product } from '../models/product.interface';
import { Result } from '../../../core/models/result.interface';


@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  private productsUrl = `${environment.apiUrl}/products`;
  private selectedProduct = signal<number | undefined>(undefined);
  private filters = signal<Filters>({} as Filters);

  private http = inject(HttpClient);
  private httpErrorService = inject(HttpErrorService);

  private productsResult$ = toObservable(this.filters).pipe(
    switchMap((filters: Filters) => {
      const filterParams: { [key: string]: string } = {};

      Object.keys(filters).forEach((key) => {
        filterParams[key] = String(filters[key as keyof Filters]);
      });

      return this.http
        .get<Product[]>(this.productsUrl, { params: filterParams })
        .pipe(
          map((p) => ({ data: p } as Result<Product[]>)),
          shareReplay(1),
          catchError((err) =>
            of({
              data: [],
              error: this.httpErrorService.formatError(err),
            } as Result<Product[]>)
          )
        );
    })
  );

  private productsResult = toSignal(this.productsResult$, {
    initialValue: { data: [] } as Result<Product[]>,
  });
  productsData = computed(() => this.productsResult().data);
  productsError = computed(() => this.productsResult().error);

  private productResult$ = toObservable(this.selectedProduct).pipe(
    filter(Boolean),
    switchMap((id) => this.http.get<Product>(`${this.productsUrl}/${id}`)),
    map((p) => ({ data: p } as Result<Product>)),
    catchError((err) =>
      of({
        data: {},
        error: this.httpErrorService.formatError(err),
      } as Result<Product>)
    )
  );
  private productResult = toSignal(this.productResult$, {
    initialValue: { data: {} } as Result<Product>,
  });
  productData = computed(() => this.productResult().data);
  productError = computed(() => this.productResult().error);

  private categoriesResult$ = this.http
    .get<string[]>(`${this.productsUrl}/categories`)
    .pipe(
      map((categories) => ({ data: categories } as Result<string[]>)),
      catchError((err) =>
        of({
          data: [],
          error: this.httpErrorService.formatError(err),
        } as Result<string[]>)
      )
    );
  private categoriesResult = toSignal(this.categoriesResult$, {
    initialValue: { data: [] } as Result<string[]>,
  });
  categoriesData = computed(() => this.categoriesResult().data);
  categoriesError = computed(() => this.categoriesResult().error);

  createProduct(product: Product): Observable<Product> {
    return this.http
      .post<Product>(this.productsUrl, product)
      .pipe(
        catchError((err) =>
          throwError(() => this.httpErrorService.formatError(err))
        )
      );
  }

  updateProduct(id: number, productData: Product): Observable<Product> {
    return this.http
      .put<Product>(`${this.productsUrl}/${id}`, productData)
      .pipe(
        catchError((err) =>
          throwError(() => this.httpErrorService.formatError(err))
        )
      );
  }

  deleteProduct(id: number): Observable<any> {
    return this.http
      .delete(`${this.productsUrl}/${id}`)
      .pipe(
        catchError((err) =>
          throwError(() => this.httpErrorService.formatError(err))
        )
      );
  }

  setFilters(filters: Filters): void {
    this.filters.set(filters);
  }

  selectProduct(id: number): void {
    this.selectedProduct.set(id);
  }
}
