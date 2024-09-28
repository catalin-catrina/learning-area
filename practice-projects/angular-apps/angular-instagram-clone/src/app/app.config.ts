import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { provideStorage, getStorage } from '@angular/fire/storage';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideFirebaseApp(() =>
      initializeApp({
        projectId: 'angular-instagram-clone-b4762',
        appId: '1:888425975075:web:ed207c82c1647408c81096',
        storageBucket: 'angular-instagram-clone-b4762.appspot.com',
        apiKey: 'AIzaSyDbl58-IkEKqEbkczXGDyERL61whCrllZg',
        authDomain: 'angular-instagram-clone-b4762.firebaseapp.com',
        messagingSenderId: '888425975075',
        measurementId: 'G-FB9HSWWL5N',
      })
    ),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    provideStorage(() => getStorage()),
    provideAnimationsAsync(),
  ],
};
