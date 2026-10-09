import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [FormsModule],
  template: `
    <div
      style="max-width: 400px; margin: 100px auto; font-family: Arial, sans-serif;"
    >
      <h1>Create Account</h1>

      <input
        type="email"
        name="email"
        [(ngModel)]="email"
        placeholder="Email"
        autocomplete="email"
        required
        style="box-sizing: border-box; width: 100%; padding: 12px; margin: 10px 0;"
      />

      <input
        type="password"
        name="password"
        [(ngModel)]="password"
        placeholder="Password (minimum 6 characters)"
        autocomplete="new-password"
        required
        style="box-sizing: border-box; width: 100%; padding: 12px; margin: 10px 0;"
      />

      <button
        type="button"
        (click)="signup()"
        [disabled]="isLoading"
        style="width: 100%; padding: 12px; margin-top: 10px;"
      >
        {{ isLoading ? 'Creating account...' : 'Sign Up' }}
      </button>

      <p>
        Already have an account?
        <button type="button" (click)="goToLogin()">Login</button>
      </p>
    </div>
  `
})
export class Signup {
  email = '';
  password = '';
  isLoading = false;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  signup(): void {
    if (this.isLoading) {
      return;
    }

    const email = this.email.trim();
    const password = this.password;
    


    if (!email || !password.trim()) {
      alert('Please enter your email and password.');
      return;
    }

    // Require a basic email format such as user@example.com.
    const emailPattern =
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (!emailPattern.test(email)) {
      alert('Please enter a valid email address.');
      return;
    }

    if (password.length < 6) {
      alert('Password must be at least 6 characters long.');
      return;
    }

    this.isLoading = true;

    this.authService.signup(email, password).subscribe({
      next: (response: any) => {
        if (response?.success !== true) {
          alert(response?.message || 'Signup failed.');
          this.isLoading = false;
          return;
        }

        alert(response.message || 'Signup successful.');
        this.router.navigate(['/login']);
      },

      error: (error: any) => {
        alert(
          error?.error?.message ||
          'Signup failed. Please check your details.'
        );
        this.isLoading = false;
      },

      complete: () => {
        this.isLoading = false;
      }
    });
  }

  goToLogin(): void {
    this.router.navigate(['/login']);
  }
}