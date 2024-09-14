import { Routes } from '@angular/router';
import { ProductsListComponent } from './products-list/products-list.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { ProductEditComponent } from './product-edit/product-edit.component';
import { ProductAddComponent } from './product-add/product-add.component';

export const routes: Routes = [
  {
    path: 'products',
    component: ProductsListComponent,
    children: [
      { path: 'add', component: ProductAddComponent },
      { path: ':id', component: ProductDetailsComponent },
      { path: ':id/edit', component: ProductEditComponent },
    ],
  },
  { path: '', redirectTo: '/products', pathMatch: 'full' },
];
