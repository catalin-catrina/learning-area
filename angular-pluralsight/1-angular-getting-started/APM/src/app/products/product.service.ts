import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { IProduct } from './product';

@Injectable({
  // the service will be available throughout the entire app
  providedIn: 'root',

  // if we want to use the service in a specific component and its children, we declare it as a property in the component (not here): providers: [ProductService]
})
export class ProductService {
  private productUrl = 'api/products/products.json';

  constructor(private http: HttpClient) {}

  // http.get returns an observable
  // we call the observble's pipe method to specify a set of operators
  // tap - access the emited item without modifying it, takes the emited data as a parameter
  // catchError - we specify a second operator after a ",". catchError handles exceptions
  getProducts(): Observable<IProduct[]> {
    return this.http.get<IProduct[]>(this.productUrl).pipe(
      tap((data) => console.log('All', JSON.stringify(data))),
      catchError(this.handleError)
    );
  }

  private handleError(err: HttpErrorResponse) {
    let errorMessage = '';
    if (err.error instanceof ErrorEvent) {
      // client-side or network error occurred
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      // backend returned unsuccessful response code
      errorMessage = `Server returned code ${err.status}, error message: ${err.message}`;
    }
    console.error(errorMessage);
    return throwError(errorMessage);
  }
}
