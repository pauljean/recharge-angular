import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';

export const guardGuard: CanActivateFn = (route, state) => {
  const authenticationService = inject(AuthenticationService);
  const router = inject(Router);

  const isLoggedIn = authenticationService.isLoggedIn();

  if (!isLoggedIn) {
    router.navigate(['signin']);
    return false;
  }

  return true;
};
