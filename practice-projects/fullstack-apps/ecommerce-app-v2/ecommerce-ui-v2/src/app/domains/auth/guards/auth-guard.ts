import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { AuthFacade } from '../../../features/login/services/auth-facade';

export const authGuard: CanActivateFn = (route, state) => {
  const authFacade = inject(AuthFacade);
  if (authFacade.authenticated()) {
    return true;
  } else {
    return false;
  }
};
