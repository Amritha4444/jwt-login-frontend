import {
  Component,
  OnDestroy,
  OnInit,
  inject
} from '@angular/core';

import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subject, takeUntil } from 'rxjs';

import * as AuthActions from '../core/auth/store/auth.actions';

import {
  selectAuthError,
  selectAuthToken
} from '../core/auth/store/auth.selectors';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class LoginComponent implements OnInit, OnDestroy {
  private store = inject(Store);
  private router = inject(Router);
  private destroy$ = new Subject<void>();

  email = '';
  password = '';

  ngOnInit(): void {
    // Navigate to dashboard after successful login
    this.store
      .select(selectAuthToken)
      .pipe(takeUntil(this.destroy$))
      .subscribe((token) => {
        if (token) {
          this.router.navigate(['/dashboard']);
        }
      });

    // Display login errors
    this.store
      .select(selectAuthError)
      .pipe(takeUntil(this.destroy$))
      .subscribe((error) => {
        if (error) {
          alert(error);
        }
      });
  }

  login(): void {
    const email = this.email.trim();
    const password = this.password;

    if (!email || !password) {
      alert('Please enter email and password.');
      return;
    }

    console.log('Login button clicked');

    this.store.dispatch(
      AuthActions.login({
        email,
        password
      })
    );

    console.log('Login action dispatched');
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}