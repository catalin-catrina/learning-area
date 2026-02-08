import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class HttpErrorService {
  formatError(err: HttpErrorResponse): string {
    let errorMessage = '';

    if (err.error instanceof ErrorEvent) {
      // client side error
      errorMessage = `Client side error: ${err.error.message}`;
    } else {
      // server error
      errorMessage = `Server side error. Code: ${err.status}. Message: ${err.statusText}`;
    }

    return errorMessage;
  }
}
