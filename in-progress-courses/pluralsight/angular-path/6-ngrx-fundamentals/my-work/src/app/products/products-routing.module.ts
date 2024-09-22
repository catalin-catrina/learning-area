import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { routes } from './products.routes';
import { provideState } from '@ngrx/store';
import { productsReducer } from './state/products.reducer';

@NgModule({
  imports: [RouterModule.forChild(routes)],
  providers: [],
})
export class ProductsRoutingModule {}
