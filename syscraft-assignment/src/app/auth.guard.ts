import { CanActivateFn, Router } from '@angular/router';
import { AuthenticationService } from './services/authentication.service';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
  const user = inject(AuthenticationService);
  const router = inject(Router);

  if (user.userValue) {
    // check if route is restricted by role
    const { roles } = route.data;

    if (roles && !(roles.toLowerCase() === user.userValue.role.toLowerCase())) {
      // role not authorized so redirect to home page
      router.navigate(['/']);
      return false;
    }

    // authorized so return true
    return true;
  }

  // not logged in so redirect to login page with the return url
  router.navigate(['/login']);
  return false;
};
