import {
  ApplicationConfig,
  inject,
  provideAppInitializer,
  provideBrowserGlobalErrorListeners,
  provideZoneChangeDetection,
} from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { AuthFacade } from './features/login/services/auth-facade';
import { firstValueFrom } from 'rxjs';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { withCredentialsInterceptor } from './domains/auth/interceptors/with-credentials-interceptor';
import { refreshOn401Interceptor } from './domains/auth/interceptors/refresh-on-401-interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideHttpClient(
      withInterceptors([withCredentialsInterceptor, refreshOn401Interceptor]),
    ),
    provideRouter(routes),
    provideAppInitializer(() => {
      const authFacade = inject(AuthFacade);
      return firstValueFrom(authFacade.init());
    }),
  ],
};
