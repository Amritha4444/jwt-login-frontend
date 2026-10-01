import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [FormsModule],
  template: `
    <div class="signup-page">

      <div class="signup-card">

        <h1>Create Account</h1>
        <p>Sign up to continue</p>

        <label>Email</label>
        <input
          type="email"
          [(ngModel)]="email"
          placeholder="Enter email"
        >

        <label>Password</label>
        <input
          type="password"
          [(ngModel)]="password"
          placeholder="Enter password"
        >

        <button type="button" (click)="signup()">
          Sign Up
        </button>

        <p>
          Already have an account?
          <a href="/login">Login</a>
        </p>

      </div>

    </div>
  `,
  styles: [`
    .signup-page {
      min-height: 100vh;
      display: flex;
      justify-content: center;
      align-items: center;
      background: #f5f7ff;
      font-family: Arial, sans-serif;
    }

    .signup-card {
      width: 380px;
      padding: 35px;
      background: white;
      border-radius: 15px;
      box-shadow: 0 10px 30px rgba(0,0,0,0.12);
    }

    h1 {
      text-align: center;
      margin-bottom: 8px;
    }

    .signup-card > p {
      text-align: center;
      color: #666;
    }

    label {
      display: block;
      margin-top: 18px;
      margin-bottom: 7px;
      font-weight: bold;
    }

    input {
      width: 100%;
      box-sizing: border-box;
      padding: 13px;
      border: 1px solid #ccc;
      border-radius: 7px;
      font-size: 15px;
    }

    button {
      width: 100%;
      padding: 13px;
      margin-top: 25px;
      border: none;
      border-radius: 7px;
      background: #4f46e5;
      color: white;
      font-size: 16px;
      font-weight: bold;
      cursor: pointer;
    }

    button:hover {
      background: #4338ca;
    }

    a {
      color: #4f46e5;
      cursor: pointer;
    }
  `]
})
export class Signup {

  email = '';
  password = '';

  constructor(
    private http: HttpClient,
    private router: Router
  ) {}

  signup() {

    if (!this.email || !this.password) {
      alert('Please enter email and password');
      return;
    }

    this.http.post(
      'http://localhost:3000/api/signup',
      {
        email: this.email,
        password: this.password
      }
    ).subscribe({
      next: (response: any) => {
        alert(response.message || 'Account created successfully');
        this.router.navigate(['/login']);
      },
      error: (error) => {
        alert(error.error?.message || 'Signup failed');
      }
    });
  }
}