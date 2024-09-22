import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ProductsPageComponent } from './products/products-page/products-page.component';
import { ProductPageComponent } from './products/product-page/product-page.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'product:id',
    component: ProductPageComponent,
  },
  {
    path: 'products',
    component: ProductsPageComponent,
  },
];
