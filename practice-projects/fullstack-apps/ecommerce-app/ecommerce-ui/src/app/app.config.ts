import {
  ApplicationConfig,
  inject,
  provideAppInitializer,
  provideZoneChangeDetection,
} from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { AuthFacade } from './features/auth/services/auth-facade';
import { firstValueFrom } from 'rxjs';
import { withCredentialsInterceptor } from './domains/auth/interceptors/with-credentials.interceptor';
import { authInterceptor } from './domains/auth/interceptors/auth-header.interceptor';
import { refreshOn401Interceptor } from './domains/auth/interceptors/refresh-on-401.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(
      withInterceptors([withCredentialsInterceptor, refreshOn401Interceptor, authInterceptor]),
    ),
    provideAppInitializer(() => {
      const authFacade = inject(AuthFacade);
      return firstValueFrom(authFacade.init());
    }),
  ],
};
