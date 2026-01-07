import { CanActivateFn } from '@angular/router';
import { AuthFacade } from '../../../features/auth/services/auth-facade';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthFacade);
  return authService.authenticated();
};
