import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router, Routes } from '@angular/router';

import { Login } from './login/login';
import { Dashboard } from './dashboard/dashboard';
import { authGuard } from './auth.guard';

@Component({
  selector: 'app-signup-page',
  standalone: true,
  imports: [FormsModule],
  template: `
    <div style="
      width: 380px;
      margin: 80px auto;
      padding: 30px;
      font-family: Arial;
      background: white;
      border: 1px solid #ddd;
      border-radius: 10px;
    ">

      <h1 style="text-align:center;">Create Account</h1>

      <label>Email</label>

      <input
        [(ngModel)]="email"
        type="email"
        placeholder="Enter email"
        style="
          display:block;
          width:100%;
          padding:12px;
          margin:8px 0 20px;
          box-sizing:border-box;
        "
      >

      <label>Password</label>

      <input
        [(ngModel)]="password"
        type="password"
        placeholder="Enter password"
        style="
          display:block;
          width:100%;
          padding:12px;
          margin:8px 0 20px;
          box-sizing:border-box;
        "
      >

      <button
        type="button"
        (click)="signup()"
        style="
          display:block;
          width:100%;
          padding:15px;
          background:#4f46e5;
          color:white;
          border:none;
          border-radius:6px;
          font-size:16px;
          cursor:pointer;
        "
      >
        SIGN UP
      </button>

      <p style="text-align:center; margin-top:20px;">
        Already have an account?
        <a href="/login">Login</a>
      </p>

    </div>
  `
})
export class SignupPage {

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


export const routes: Routes = [

  {
    path: 'login',
    component: Login
  },

  {
    path: 'signup',
    component: SignupPage
  },

  {
    path: 'dashboard',
    component: Dashboard,
    canActivate: [authGuard]
  },

  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  }

];