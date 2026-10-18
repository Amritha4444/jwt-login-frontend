import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subject, takeUntil } from 'rxjs';

import * as AuthActions from '../core/auth/store/auth.actions';
import {
  selectAuthError,
  selectAuthLoading
} from '../core/auth/store/auth.selectors';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './signup.html',
  styleUrls: ['./signup.css']
})
export class SignupComponent implements OnInit, OnDestroy {
  private store = inject(Store);
  private destroy$ = new Subject<void>();
  private router = inject(Router);

  email = '';
  password = '';
  confirmPassword = '';
  errorMessage = '';
  successMessage = '';
  isLoading = false;

  ngOnInit(): void {
    this.store.select(selectAuthLoading)
      .pipe(takeUntil(this.destroy$))
      .subscribe((loading) => {
        this.isLoading = loading;
      });

    this.store.select(selectAuthError)
      .pipe(takeUntil(this.destroy$))
      .subscribe((error) => {
        if (error) {
          this.errorMessage = error;
        }
      });
  }

  onSignup(): void {
    this.errorMessage = '';
    this.successMessage = '';

    const email = this.email.trim().toLowerCase();
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(email)) {
      this.errorMessage = 'Please enter a valid email address.';
      return;
    }

    const commonTypoDomains = [
      'gmil.com',
      'gmal.com',
      'gmai.com',
      'gmail.con',
      'gamil.com',
      'gm.com'
    ];

    if (commonTypoDomains.some(domain => email.endsWith('@' + domain))) {
      this.errorMessage = 'Please check your email. Did you mean @gmail.com?';
      return;
    }

    if (this.password.length < 8) {
      this.errorMessage = 'Password must contain at least 8 characters.';
      return;
    }

    if (this.password !== this.confirmPassword) {
      this.errorMessage = 'Passwords do not match.';
      return;
    }

    this.store.dispatch(
      AuthActions.signup({
        email,
        password: this.password
      })
    );
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}