import { HttpContextToken, HttpInterceptorFn } from '@angular/common/http';
import { environment } from '../../../environments/environment';

/**
 * SKIP_CREDENTIALS is an optional per-request switch.
 * - Default is false (credentials ON when the request targets your API).
 * - If a specific call should NOT send cookies, set this flag to true on that request's context.
 *
 * Example opt-out at call site:
 *   this.http.get('/api/public/info', {
 *     context: new HttpContext().set(SKIP_CREDENTIALS, true)
 *   })
 */
export const SKIP_CREDENTIALS = new HttpContextToken<boolean>(() => false);

/**
 * withCredentialsInterceptor
 *
 * What this does:
 * - Adds the *request option* withCredentials: true to requests that target YOUR API.
 * - It does NOT add any HTTP header like "withCredentials" or "credentials". Those headers do nothing.
 * - It scopes this behavior by:
 *   1) Checking the request's ORIGIN matches your API origin (scheme + host + port).
 *   2) Checking the request's PATH lives under your API base path (e.g. '/api' or '/api/v1').
 *
 * Why:
 * - Cookies only flow on cross-origin requests when withCredentials is true AND the server allows credentials in CORS.
 * - We do not want to attach cookies to unrelated endpoints (static assets, health checks, third party APIs).
 *
 * Key gotchas this solves:
 * - Absolute vs relative URLs: we normalize any request URL to an absolute URL so origin/path checks are reliable.
 * - '/api' vs '/apiexperimental': we normalize the base path to include a trailing slash so prefix matches are exact.
 * - Request options vs headers: withCredentials is a request option set via req.clone({...}), not an HTTP header.
 */
export const withCredentialsInterceptor: HttpInterceptorFn = (req, next) => {
  // 0) Allow explicit opt out for a single call.
  // If a caller set SKIP_CREDENTIALS to true, we do nothing and pass the request through.
  if (req.context.get(SKIP_CREDENTIALS)) {
    return next(req);
  }

  /**
   * 1) Normalize the request URL to an absolute URL so we can read .origin and .pathname safely.
   *
   * - If req.url is already absolute (e.g. 'http://localhost:3000/api/...'), the base is ignored.
   * - If req.url is relative (e.g. '/api/...'), the browser resolves it against window.location.origin
   *   (e.g. 'http://localhost:4200'), which is exactly what the request will use on the wire.
   *
   * This is a reliable way to handle both absolute and relative calls with one path.
   */
  const reqUrl = new URL(req.url, window.location.origin);

  /**
   * 2) Parse your API base URL from environment.
   * Make sure environment.apiUrl is a FULL URL, like:
   *   - 'http://localhost:3000' or
   *   - 'http://localhost:3000/api' or
   *   - 'https://api.myapp.com/api/v1'
   */
  const apiUrl = new URL(environment.apiUrl);

  /**
   * 3) Origin gate: only affect calls that actually target YOUR API origin.
   * Example:
   *   reqUrl.origin === 'http://localhost:3000'
   *   apiUrl.origin === 'http://localhost:3000'  -> sameOrigin = true
   *
   * If you hit third party endpoints or your SPA origin, this will be false and we will skip.
   */
  const sameOrigin = reqUrl.origin === apiUrl.origin;

  /**
   * 4) Base path gate: only affect paths that live under your API prefix.
   *
   * What is "base path"?
   * - It is the path prefix where your API is mounted, like '/' or '/api' or '/api/v1'.
   *
   * Why check this?
   * - Your API host may also serve static files or other routes.
   * - We do not want to add cookies to '/assets/main.js' or '/healthz'.
   *
   * How we check:
   * - Normalize apiUrl.pathname to always end with a slash, so '/api' becomes '/api/'.
   * - Then require reqUrl.pathname to start with that normalized prefix.
   *   This prevents '/api' matching '/apiexperimental'.
   */
  const apiBasePath = apiUrl.pathname.endsWith('/') ? apiUrl.pathname : apiUrl.pathname + '/';
  const underBasePath = apiUrl.pathname === '/' || reqUrl.pathname.startsWith(apiBasePath);

  /**
   * 5) Only now do we set the *request option* withCredentials: true.
   *
   * Important:
   * - This is NOT a header. Do not try to do headers.append('withCredentials','true').
   * - HttpRequest is immutable, so we must clone it with the option.
   * - We also respect an existing explicit setting. If someone already set withCredentials, we leave it as is.
   */
  if (sameOrigin && underBasePath && req.withCredentials !== true) {
    req = req.clone({ withCredentials: true });
  }

  // 6) Forward to the next handler.
  return next(req);
};

/**
 * How to validate this in DevTools (Network tab):
 *
 * 1) After /auth/login, the *response* from your API should include:
 *    - Set-Cookie: refresh_token=...
 *
 * 2) On a subsequent /auth/refresh, the *request* to your API should include:
 *    - Cookie: refresh_token=...
 *
 * 3) Requests to third party origins or non-API paths (like /assets/...) should NOT carry cookies.
 *
 * If cookies do not flow:
 * - Confirm the interceptor cloned with withCredentials: true (add a console.assert temporarily).
 * - Confirm your server returns CORS headers:
 *     Access-Control-Allow-Origin: <exact origin, not '*'>
 *     Access-Control-Allow-Credentials: true
 * - Confirm environment.apiUrl is a FULL URL that points at your API.
 * - Check for accidental double slashes in paths (e.g. '/api//refresh').
 */