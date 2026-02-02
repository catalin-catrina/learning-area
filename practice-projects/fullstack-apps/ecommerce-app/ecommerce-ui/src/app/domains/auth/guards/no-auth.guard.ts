import { CanActivateFn, Router } from '@angular/router';
import { AuthFacade } from '../../../features/auth/services/auth-facade';
import { inject } from '@angular/core';

export const noAuthGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthFacade);
  const router = inject(Router);

  if (!authService.authenticated()) {
    return true;
  } else {
    router.navigate(['/products']);
    return false;
  }
};
