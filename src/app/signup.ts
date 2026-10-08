import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [FormsModule],
  template: `
    <div style="max-width:400px;margin:100px auto;font-family:Arial">

      <h1>Create Account</h1>

      <input
        type="email"
        [(ngModel)]="email"
        placeholder="Email"
        style="width:100%;padding:12px;margin:10px 0"
      >

      <input
        type="password"
        [(ngModel)]="password"
        placeholder="Password"
        style="width:100%;padding:12px;margin:10px 0"
      >

      <button
        type="button"
        (click)="signup()"
        style="width:100%;padding:12px;margin-top:10px"
      >
        Sign Up
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

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  signup() {
    if (!this.email || !this.password) {
      alert('Please enter email and password');
      return;
    }

    this.authService.signup(this.email.trim(), this.password).subscribe({
      next: (response: any) => {
        alert(response.message || 'Signup successful');
        this.router.navigate(['/login']);
      },
      error: (error: any) => {
        alert(error.error?.message || 'Signup failed');
      }
    });
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }
}