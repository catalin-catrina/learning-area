import { createAction, createReducer, on } from '@ngrx/store';

export interface ProductsState {
  showProductCode: boolean;
}

const initialState: ProductsState = {
  showProductCode: true,
};

export const toggleShowProductCode = createAction(
  '[Products Page] Toggle Show Product Code'
);

export const productsReducer = createReducer(
  initialState,
  on(toggleShowProductCode, (state) => ({
    ...state,
    showProductCode: !state.showProductCode,
  }))
);
