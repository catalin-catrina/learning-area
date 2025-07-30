import {
  ApplicationConfig,
  provideBrowserGlobalErrorListeners,
  provideZoneChangeDetection,
} from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { InteractionType, PublicClientApplication } from '@azure/msal-browser';
import { environment } from '../environments/environment';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),

    {
      provide: 'MSAL_INSTANCE',
      useFactory: () => {
        return new PublicClientApplication({
          auth: {
            clientId: environment.azure.auth.clientId,
            authority: environment.azure.auth.authority,
            redirectUri: environment.azure.auth.redirectUri,
            postLogoutRedirectUri: environment.azure.auth.postLogoutRedirectUri,
          },
          cache: {
            cacheLocation: environment.azure.cache.cacheLocation,
          },
          system: {
            loggerOptions: {
              loggerCallback: (level, message, containsPii) => {
                console.log(message);
              },
              piiLoggingEnabled: false,
              logLevel: 0, // LogLevel.Info
            },
          },
        });
      },
    },
  ],
};
