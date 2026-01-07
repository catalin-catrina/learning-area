import { Routes } from '@angular/router';
import { LoginComponent } from './features/auth/components/login/login.component';
import { RegisterComponent } from './features/auth/components/register/register.component';
import { ProductsComponent } from './features/products/products.component';
import { ProductsListComponent } from './features/products/components/products-list/products-list.component';
import { CreateProductComponent } from './features/products/components/create-product/create-product.component';
import { EditProductComponent } from './features/products/components/edit-product/edit-product.component';
import { ProductComponent } from './features/products/components/product/product.component';
import { authGuard } from './domains/auth/guards/auth.guard';

export const routes: Routes = [
  {
    path: 'products',
    component: ProductsComponent,
    canActivateChild: [authGuard],
    children: [
      { path: '', component: ProductsListComponent },
      { path: 'create', component: CreateProductComponent },
      { path: 'edit', component: EditProductComponent },
      { path: ':id', component: ProductComponent },
    ],
  },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },

  { path: '', redirectTo: '/login', pathMatch: 'full' },
];
