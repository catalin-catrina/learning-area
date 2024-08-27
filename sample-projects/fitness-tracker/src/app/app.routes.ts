import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { SignupComponent } from './auth/signup/signup.component';
import { LoginComponent } from './auth/login/login.component';
import { TrainingComponent } from './training/training.component';

export const routes: Routes = [
  { path: 'signup', component: SignupComponent },
  { path: 'login', component: LoginComponent },
  { path: 'training', component: TrainingComponent },
  { path: '', component: HomeComponent },
  { path: '**', redirectTo: '' },
];
