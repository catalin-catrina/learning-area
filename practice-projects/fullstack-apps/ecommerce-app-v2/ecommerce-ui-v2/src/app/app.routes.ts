import { Routes } from '@angular/router';
import { Home } from './layout/home/home';
import { Login } from './features/login/login';
import { authGuard } from './domains/auth/guards/auth-guard';
import { noAuthGuard } from './domains/auth/guards/no-auth-guard';

export const routes: Routes = [
  {
    path: 'home',
    component: Home,
    canActivate: [authGuard],
  },
  { path: 'login', component: Login, canActivate: [noAuthGuard] },

  { path: '', redirectTo: 'login', pathMatch: 'full' },
];
