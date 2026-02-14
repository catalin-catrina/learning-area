import { HttpContextToken, HttpInterceptorFn } from '@angular/common/http';
import { environment } from '../../../environments/environment';

export const SKIP_CREDENTIALS = new HttpContextToken<boolean>(() => false);

export const withCredentialsInterceptor: HttpInterceptorFn = (req, next) => {
  if (req.context.get(SKIP_CREDENTIALS)) {
    return next(req);
  }

  const reqUrl = new URL(req.url, environment.apiUrl);
  const apiUrl = new URL(environment.apiUrl);
  const sameOrigin = reqUrl.origin === apiUrl.origin;
  const apiBasePath = apiUrl.pathname.endsWith('/')
    ? apiUrl.pathname
    : `${apiUrl.pathname}/`;
  const underBasePath = reqUrl.pathname.startsWith(apiBasePath);

  if (sameOrigin && underBasePath && !req.withCredentials) {
    req = req.clone({
      withCredentials: true,
    });
  }

  return next(req);
};
