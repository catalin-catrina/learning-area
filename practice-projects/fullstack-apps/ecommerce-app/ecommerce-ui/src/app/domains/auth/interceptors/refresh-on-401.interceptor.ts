import { HttpInterceptorFn } from '@angular/common/http';

export const refreshOn401Interceptor: HttpInterceptorFn = (req, next) => {
  return next(req);
};
