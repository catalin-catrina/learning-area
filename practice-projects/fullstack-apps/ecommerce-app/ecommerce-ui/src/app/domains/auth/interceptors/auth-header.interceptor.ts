import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AccessTokenStore } from '../state/access-token.store';
import { environment } from '../../../environments/environment';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const reqUrl = new URL(req.url, window.location.origin);
  const apiUrl = new URL(environment.apiUrl);

  const sameOrigin = reqUrl.origin === apiUrl.origin;

  const apiBasePath = apiUrl.pathname.endsWith('/')
    ? apiUrl.pathname
    : apiUrl.pathname + '/';
  const underBasePath =
    apiUrl.pathname === '/' || reqUrl.pathname.startsWith(apiBasePath);

  const accessToken = inject(AccessTokenStore).get();

  if (sameOrigin && underBasePath && accessToken) {
    req = req.clone({
      setHeaders: { Authorization: `Bearer ${accessToken}` },
    });
  }

  return next(req);
};
