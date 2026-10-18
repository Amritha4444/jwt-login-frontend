import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap, tap } from 'rxjs/operators';
import { Router } from '@angular/router';

import * as AuthActions from './auth.actions';
import { AuthService } from '../auth.service';

@Injectable()
export class AuthEffects {
  private actions$ = inject(Actions);
  private authService = inject(AuthService);
  private router = inject(Router);

  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.login),
      mergeMap(({ email, password }) =>
        this.authService.login(email, password).pipe(
          map((response: any) => {
            

            const token = response.data.token;
            const user = response.data.user;

            this.authService.saveToken(token);

            return AuthActions.loginSuccess({ token, user });
          }),
          catchError((error) => {
            

            return of(
              AuthActions.loginFailure({
                error:
                  error?.error?.message ||
                  'Login failed. Check your credentials and backend.'
              })
            );
          })
        )
      )
    )
  );

  signup$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.signup),
      mergeMap(({ email, password }) =>
        this.authService.signup(email, password).pipe(
          map((response: any) =>
            AuthActions.signupSuccess({
              user: response.data.user ?? response.data
            })
          ),
          catchError((error) => {
            console.error('Signup API error:', error);

            return of(
              AuthActions.signupFailure({
                error: error?.error?.message || 'Signup failed'
              })
            );
          })
        )
      )
    )
  );

  signupSuccessRedirect$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.signupSuccess),
        tap(() => this.router.navigate(['/login']))
      ),
    { dispatch: false }
  );

  logout$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.logout),
        tap(() => this.authService.logout())
      ),
    { dispatch: false }
  );
}