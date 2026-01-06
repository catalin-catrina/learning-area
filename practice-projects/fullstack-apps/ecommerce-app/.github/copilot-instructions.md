# AI Copilot Instructions for E-commerce App

## Architecture Overview

This is a **fullstack e-commerce application** split into two independent deployments:

- **`ecommerce-api/`**: Node.js/Express REST API (port 3000)
- **`ecommerce-ui/`**: Angular 20 single-page application (port 4200)

**Data flow**: UI makes HTTP requests to API using RxJS. API uses in-memory data (no database). JWT tokens manage auth state via `Authorization: Bearer <token>` headers.

## Key Architectural Patterns

### Backend (Express API)

**Route → Controller → Service → Data pattern**:

- Routes in `routes/` (e.g., `products.js`) map to controllers
- Controllers in `controllers/` (e.g., `productController.js`) handle business logic
- Data sourced from `data/` files (in-memory, no persistence)
- Filters and sorting applied in controllers (see `getAllProducts` in `productController.js` for complex query handling)

**Error handling**:

- Throw `CustomError(message, statusCode)` from `utils/customError.js`
- Global error handler in `middleware/errorHandler.js` catches all errors and responds with status + error message

**Authentication**:

- JWT signing/verification using hardcoded `SECRET_KEY = 'your_secret_key'` (see `middleware/verifyToken.js`)
- Token format: `Authorization: Bearer <jwt>`
- Use `verifyToken` middleware on protected routes (example: `orders.js`)

**Validation**:

- Joi schemas in `validators/` (e.g., `userValidator.js`)
- Apply validation in controllers before processing

### Frontend (Angular)

**Reactive architecture using signals + RxJS**:

- Services in `services/` use Angular `signal()` for state and `toObservable()` to bridge to RxJS pipelines
- Example: `ProductsService` maintains `filters` signal, converts to observable, switchMaps to HTTP calls
- Use `computed()` for derived state (e.g., filtering results)

**Component organization**:

- Smart/container components (e.g., `ProductsComponent`) manage state and data fetching
- Dumb/presentational components (e.g., `ProductComponent`) display data from inputs
- Child routes under `ProductsComponent`: `ProductsListComponent`, `CreateProductComponent`, `EditProductComponent`, `ProductComponent`

**HTTP error handling**:

- Centralized `HttpErrorService` formats API errors into user-friendly messages
- Services return `Result<T>` interface from `utilities/result.interface.ts` (wraps `data` + `error` fields)

**Data models**: Define interfaces in `utilities/` (e.g., `Product`, `Filters`, `Result`)

**API base URL**: Environment-based (`environment.ts` vs `environment.prod.ts`) via `environment.apiUrl`

## Development Workflows

### Running locally

**API**: `cd ecommerce-api && npm test` (Jest tests) or `npm start` (via package.json; nodemon watches changes)

**UI**: `cd ecommerce-ui && npm start` (Angular dev server on port 4200) or `npm test` (Karma + Jasmine)

### Testing

**API**: Jest with Supertest for integration tests. Example: `auth.test.js` uses Supertest to mock Express app and verify routes

- Tests in `ecommerce-api/tests/` mirror route names (e.g., `auth.test.js` tests auth routes)

**UI**: Karma + Jasmine. Angular CLI handles test setup via `karma.conf.js`

## Project-Specific Conventions

1. **Query parameter filtering**: In `productController.getAllProducts()`, filters are applied by:

   - Checking for special keys (`minPrice`, `maxPrice`, `sortBy`, `sortOrder`)
   - Dynamic filtering on other query params (case-insensitive, exact match)
   - Sorting by numeric or string fields with `asc`/`desc` order
   - **Do not modify this logic without understanding the UI's filter contract**

2. **Hardcoded test data**: All data lives in `data/` as CommonJS exports (arrays of objects). No persistence between requests.

3. **CORS enabled**: API has `cors()` middleware active; UI can make cross-origin requests from `localhost:4200`.

4. **HTTP status codes**:

   - 200: Success
   - 401: Invalid credentials
   - 403: Token verification failed
   - 501: Missing/malformed token (non-standard, check `verifyToken.js`)
   - Custom `statusCode` in `CustomError` propagates through error handler

5. **Angular routing**: Lazy loading not used; all routes eager-loaded via `app.routes.ts`

## Common Tasks

- **Add new API endpoint**: Create route in `routes/`, controller method in `controllers/`, add test in `tests/`
- **Add filtering**: Extend query param handling in controller; update UI to send filter params via service
- **Update product schema**: Modify shape in `data/productsData.js` and `Product` interface in UI
- **Add auth to route**: Import `verifyToken` middleware and apply to route handlers
- **Update API URL**: Modify `environment.ts` and `environment.prod.ts` in UI

## Critical Integration Points

- **API → UI data contract**: Ensure `Product`, `User`, `Order` interfaces match API response shapes
- **JWT token lifetime**: Tokens generated in `authController.login()`, verified in `verifyToken` middleware
- **Filtering state**: UI's `filters` signal syncs with API query params via `switchMap` in `ProductsService`

## Personal Requests

- Don't create any documentation / .md files, just leave inline comments for describing overall functionality of a piece of code, and for more tricky or complex code
