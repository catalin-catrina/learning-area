import { Routes } from '@angular/router';
import { Home } from './layout/home/home';
import { Login } from './features/login/login';

export const routes: Routes = [
  {
    path: 'home',
    component: Home,
  },
  { path: 'login', component: Login },

  { path: '', redirectTo: '/login', pathMatch: 'full' },
];
