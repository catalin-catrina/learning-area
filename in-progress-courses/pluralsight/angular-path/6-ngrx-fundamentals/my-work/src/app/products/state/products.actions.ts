import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Product } from '../product.model';

export const ProductsPageActions = createActionGroup({
  source: 'Products Page',
  events: {
    'Toggle Show Product Code': emptyProps(),
    'Load Products': emptyProps()
  },
});

export const ProductsApiActions = createActionGroup({
  source: 'Products API',
  events: {
    'Products Loaded Success': props<{products: Product[]}>()
  }
})
