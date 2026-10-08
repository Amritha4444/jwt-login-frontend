import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from './auth.service';

export const authGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const token = authService.getToken();

  if (!token) {
    return router.createUrlTree(['/login']);
  }

  try {
    const payload = JSON.parse(atob(token.split('.')[1]));

    if (payload.exp && payload.exp * 1000 > Date.now()) {
      return true;
    }

    authService.logout();
    return router.createUrlTree(['/login']);

  } catch {
    authService.logout();
    return router.createUrlTree(['/login']);
  }
};