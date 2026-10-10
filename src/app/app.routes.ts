import { Routes } from '@angular/router';

import { LoginComponent } from './login/login';
import { SignupComponent } from './signup';
import { DashboardComponent } from './dashboard/dashboard';
import { authGuard } from './core/auth/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },

  { path: 'login', component: LoginComponent },

  { path: 'signup', component: SignupComponent },

  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [authGuard]
  }
];