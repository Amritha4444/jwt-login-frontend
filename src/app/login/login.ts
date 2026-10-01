import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {

  email = '';
  password = '';

  constructor(
    private http: HttpClient,
    private router: Router
  ) {}

  login() {

    if (!this.email || !this.password) {
      alert('Please enter email and password');
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.email)) {
      alert('Please enter a valid email');
      return;
    }

    const loginData = {
      email: this.email,
      password: this.password
    };

    this.http.post<any>(
      'http://localhost:3000/api/login',
      loginData
    ).subscribe({
      next: (response) => {

        alert('Login successful!');

        localStorage.setItem('token', response.token);

        this.router.navigate(['/dashboard']);
      },

      error: (error) => {
        console.log('Login failed:', error);
        alert('Invalid email or password');
      }
    });
  }
}