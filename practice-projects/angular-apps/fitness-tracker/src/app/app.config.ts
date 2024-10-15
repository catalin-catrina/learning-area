import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideNativeDateAdapter } from '@angular/material/core';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideAnimationsAsync(),
    provideNativeDateAdapter(), provideFirebaseApp(() => initializeApp({"projectId":"fitness-tracker-angular-7ee96","appId":"1:902761089992:web:1c3626843509e3c70f0efd","storageBucket":"fitness-tracker-angular-7ee96.appspot.com","apiKey":"AIzaSyAekS0UNMn_TDzzafma0P3OXFUfRWkPmtc","authDomain":"fitness-tracker-angular-7ee96.firebaseapp.com","messagingSenderId":"902761089992"})), provideAuth(() => getAuth()), provideFirestore(() => getFirestore()),
  ],
};
