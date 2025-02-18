import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
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

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  // Just enough here for the code to compile
  private productsUrl = 'api/products';
  private reviewsUrl = 'api/reviews';

  productSelectedSubject = new BehaviorSubject<number | undefined>(undefined);
  productSelected$ = this.productSelectedSubject.asObservable();

  private http = inject(HttpClient);
  private reviewService = inject(ReviewService);
  private httpErrorService = inject(HttpErrorService);

  readonly products$ = this.http.get<Product[]>(this.productsUrl).pipe(
    shareReplay(1),
    catchError((err) => this.handleError(err))
  );

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
  readonly product$ = combineLatest([
    this.productSelected$,
    this.products$,
  ]).pipe(
    map(([selectedProductId, products]) =>
      products.find((product) => product.id === selectedProductId)
    ),
    filter(Boolean),
    switchMap((product) => this.getProductWithReviews(product)),
    catchError((err) => this.handleError(err))
  );

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
    this.productSelectedSubject.next(id);
  }

  handleError(err: HttpErrorResponse): Observable<never> {
    const errorMessage = this.httpErrorService.formatError(err);
    throw errorMessage;
    // return throwError(() => errorMessage);
  }
}
