import { Routes } from '@angular/router';

import { Login } from './login/login';
import { Signup } from './signup';
import { Dashboard } from './dashboard/dashboard';
import { authGuard } from './auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },

  { path: 'login', component: Login },

  { path: 'signup', component: Signup },

  {
    path: 'dashboard',
    component: Dashboard,
    canActivate: [authGuard]
  }
];