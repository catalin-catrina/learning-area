import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';
import {
  BehaviorSubject,
  catchError,
  combineLatest,
  filter,
  map,
  Observable,
  of,
  shareReplay,
  switchMap,
  tap,
  throwError,
} from 'rxjs';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { Product } from './product';
import { HttpErrorService } from '../utilities/http-error.service';
import { ReviewService } from '../reviews/review.service';
import { Review } from '../reviews/review';
import { Result } from '../utilities/result';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private productsUrl = 'api/products';
  // constructor(private http: HttpClient) {}
  private http = inject(HttpClient);
  private errorService = inject(HttpErrorService);
  private reviewService = inject(ReviewService);

  /////////////////////////////////////////////////////////////////////////////////////
  // using subject / behaviorsubject to react to user actions
  // in this case, we react to a click event, we pass the id of the item the user clicked on into the behaviorsubject, which then emits it, and we can read that id in any component
//   private productSelectedSubject = new BehaviorSubject<number | undefined>(
//     undefined
//   );
//   readonly productSelected$ = this.productSelectedSubject.asObservable();
// 
//   productSelected(selectedProductId: number): void {
//     this.productSelectedSubject.next(selectedProductId);
//   }

  // get a single product
  // readonly product$ = this.productSelected$.pipe(
  //   filter(Boolean),
  //   switchMap((id) => {
  //     const productUrl = this.productsUrl + '/' + id;
  //     return this.http.get<Product>(productUrl).pipe(
  //       switchMap((product) => this.getProductWithReviews(product)),
  //       catchError((err) => this.handleError(err))
  //     );
  //   })
  // );
  /////////////////////////////////////////////////////////////////////////////////////

  /////////////////////////////////////////////////////////////////////////////////////
  // using signals to do the same thing
  selectedProductIdSignal = signal<number | undefined>(undefined);
  productSelected(selectedProductId: number): void {
    this.selectedProductIdSignal.set(selectedProductId);
  }
  /////////////////////////////////////////////////////////////////////////////////////

  // get a single product
  private productResult$ = toObservable(this.selectedProductIdSignal).pipe(
    filter(Boolean),
    switchMap((id) => {
      const productUrl = this.productsUrl + '/' + id;
      return this.http.get<Product>(productUrl).pipe(
        switchMap((product) => this.getProductWithReviews(product)),
        catchError((err) =>
          of({
            data: undefined,
            error: this.errorService.formatError(err),
          } as Result<Product>)
        )
      );
    }),
    map((product) => ({ data: product } as Result<Product>))
  );
  private productResult = toSignal(this.productResult$);
  product = computed(() => this.productResult()?.data);
  productError = computed(() => this.productResult()?.error);

  // product$ = combineLatest([this.products$, this.productSelected$]).pipe(
  //   map(([products, selectedProductId]) =>
  //     products.find((product) => product.id === selectedProductId)
  //   ),
  //   filter(Boolean),
  //   switchMap((product) => this.getProductWithReviews(product)),
  //   catchError((err) => this.handleError(err))
  // );

  // get all products
  private productsResult$ = this.http.get<Product[]>(this.productsUrl).pipe(
    map(
      (products) => ({ data: products, error: undefined } as Result<Product[]>)
    ),
    tap((products) => console.log('In http pipeline', products)),
    shareReplay(1),
    catchError((err) =>
      of({ data: [], error: this.errorService.formatError(err) } as Result<
        Product[]
      >)
    )
  );

  private productsResult = toSignal(this.productsResult$, {
    initialValue: { data: [] } as Result<Product[]>,
  });
  products = computed(() => this.productsResult().data);
  productsError = computed(() => this.productsResult().error);

  // error handling using try catch
  // products = computed(() => {
  //   try {
  //     return toSignal(this.products$, {
  //       initialValue: [] as Product[],
  //     })();
  //   } catch (error) {
  //     return [] as Product[];
  //   }
  // });

  private getProductWithReviews(product: Product): Observable<Product> {
    if (product.hasReviews) {
      return this.http
        .get<Review[]>(this.reviewService.getReviewUrl(product.id))
        .pipe(map((reviews) => ({ ...product, reviews })));
    } else {
      return of(product);
    }
  }

  private handleError(err: HttpErrorResponse): Observable<never> {
    const formattedMessage = this.errorService.formatError(err);
    return throwError(() => formattedMessage);
    // same thing as:
    // throw formattedMessage;
  }
}
