import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import {
  catchError,
  finalize,
  ReplaySubject,
  switchMap,
  throwError,
} from 'rxjs';
import { AuthApi } from '../services/auth-api';

let isRefreshing = false;
let refreshEnded$ = new ReplaySubject<void>(1);

export const refreshOn401Interceptor: HttpInterceptorFn = (req, next) => {
  const authApi = inject(AuthApi);

  return next(req).pipe(
    catchError((err) => {
      if (!(err instanceof HttpErrorResponse)) return throwError(() => err);

      const is401 = err.status === 401;
      const isRefreshUrl = req.url.endsWith('/auth/refresh');
      if (!is401 || isRefreshUrl) return throwError(() => err);

      if (!isRefreshing) {
        isRefreshing = true;

        return authApi.refreshToken().pipe(
          switchMap(() => next(req)),
          finalize(() => {
            isRefreshing = false;
            refreshEnded$.next();
            refreshEnded$ = new ReplaySubject<void>(1);
          }),
        );
      } else {
        return refreshEnded$.pipe(switchMap(() => next(req)));
      }
    }),
  );
};
