import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Product } from './product.model';
import { catchError, Observable, tap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  private productsAPIUrl = 'api/products';

  constructor(private http: HttpClient) {}

  getAll() {
    return this.http.get<Product[]>(this.productsAPIUrl).pipe(
      tap((x) => console.log(x)),
      catchError(this.handleError)
    );
  }

  getById(id: number) {
    return this.http.get<Product>(`${this.productsAPIUrl}/${id}`).pipe(
      tap((x) => console.log(x)),
      catchError(this.handleError)
    );
  }

  add({ name, price }: Product): Observable<Product> {
    return this.http
      .post<Product>(this.productsAPIUrl, { name, price })
      .pipe(catchError(this.handleError));
  }

  update(product: Product): Observable<Product> {
    return this.http.put<Product>(this.productsAPIUrl, product).pipe(
      tap((x) => console.log(x)),
      catchError(this.handleError)
    );
  }

  delete(id: number): Observable<unknown> {
    const url = `${this.productsAPIUrl}/${id}`;
    return this.http.delete(url).pipe(
      tap((x) => console.log(x)),
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    console.error('An error occurred:', error); // Log the complete error
    return throwError(() => `${error.status}: Something bad happened.`);
  }
}
