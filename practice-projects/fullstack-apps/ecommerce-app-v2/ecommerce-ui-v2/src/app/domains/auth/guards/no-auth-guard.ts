import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { AuthFacade } from '../../../features/login/services/auth-facade';

export const noAuthGuard: CanActivateFn = (route, state) => {
  const authFacade = inject(AuthFacade);
  if (authFacade.authenticated()) {
    return false;
  } else {
    console.log(authFacade.authenticated());
    return true;
  }
};
