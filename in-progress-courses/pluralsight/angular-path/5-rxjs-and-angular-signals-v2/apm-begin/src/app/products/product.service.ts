import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';
import {
  BehaviorSubject,
  catchError,
  combineLatest,
  filter,
  map,
  mergeAll,
  Observable,
  of,
  shareReplay,
  Subject,
  switchAll,
  switchMap,
  tap,
  throwError,
} from 'rxjs';
import { Product } from './product';
import { HttpErrorService } from '../utilities/http-error.service';
import { Review } from '../reviews/review';
import { ReviewService } from '../reviews/review.service';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { Result } from '../utilities/result.interface';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  // Just enough here for the code to compile
  private productsUrl = 'api/products';

  selectedProduct = signal<number | undefined>(undefined);

  private http = inject(HttpClient);
  private reviewService = inject(ReviewService);
  private httpErrorService = inject(HttpErrorService);

  private productsResult$ = this.http.get<Product[]>(this.productsUrl).pipe(
    map((p) => ({ data: p } as Result<Product[]>)),
    shareReplay(1),
    catchError((err) =>
      of({ data: [], error: this.httpErrorService.formatError(err) })
    )
  );
  private productsResult = toSignal(this.productsResult$, {
    initialValue: { data: [] } as Result<Product[]>,
  });
  products = computed(() => this.productsResult().data);
  productsError = computed(() => this.productsResult().error);

  private productResult$ = toObservable(this.selectedProduct).pipe(
    filter(Boolean),
    switchMap((id) =>
      this.http
        .get<Product>(this.productsUrl + '/' + id)
        .pipe(switchMap((product) => this.getProductWithReviews(product)))
    ),
    map((product) => ({ data: product } as Result<Product>)),
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
  product = computed(() => this.productResult().data);
  productError = computed(() => this.productResult().error);

  getProductWithReviews(product: Product): Observable<Product> {
    if (product.hasReviews) {
      return this.http
        .get<Review[]>(this.reviewService.getReviewUrl(product.id))
        .pipe(
          map(
            (reviews) =>
              ({
                ...product,
                reviews,
              } as Product)
          )
        );
    } else {
      return of(product);
    }
  }

  selectProduct(id: number): void {
    this.selectedProduct.set(id);
  }

  handleError(err: HttpErrorResponse): Observable<never> {
    const errorMessage = this.httpErrorService.formatError(err);
    throw errorMessage;
    // return throwError(() => errorMessage);
  }

  // changing state using Subjects / BehaviorSubjects

  // productSelectedSubject = new BehaviorSubject<number | undefined>(undefined);
  // productSelected$ = this.productSelectedSubject.asObservable();

  // this gets the selected product by making a get using the id of the latest emission from productSelected BehaviourSubject
  // readonly product$ = this.productSelected$.pipe(
  //   filter(Boolean),
  //   switchMap((id) =>
  //     this.http
  //       .get<Product>(`${this.productsUrl}/${id}`)
  //       .pipe(switchMap((product) => this.getProductWithReviews(product)))
  //   )
  // );

  // this gets the selected product by looking through the products every time productSelected BehaviourSubject emits a new id
  // readonly product$ = combineLatest([
  //   this.productSelected$,
  //   this.products$,
  // ]).pipe(
  //   map(([selectedProductId, products]) =>
  //     products.find((product) => product.id === selectedProductId)
  //   ),
  //   filter(Boolean),
  //   switchMap((product) => this.getProductWithReviews(product)),
  //   catchError((err) => this.handleError(err))
  // );

  // selectProduct(id: number): void {
  //   this.productSelectedSubject.next(id);
  // }
}
