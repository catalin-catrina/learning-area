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

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(withInterceptors([withCredentialsInterceptor])),
    provideAppInitializer(() => {
      const authFacade = inject(AuthFacade);
      return firstValueFrom(authFacade.init());
    }),
  ],
};
