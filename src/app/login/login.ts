import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

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
    private authService: AuthService,
    private router: Router
  ) {}

  login() {
    const email = this.email.trim();
    const password = this.password;

    if (!email || !password) {
      alert('Please enter email and password');
      return;
    }

    this.authService.login(email, password).subscribe({
      next: (response) => {
        console.log('Login response:', response);

        // Backend returns token inside data
        this.authService.saveToken(response.data.token);

        alert('Login successful');
        this.router.navigate(['/dashboard']);
      },
      error: (error) => {
        console.log('Login error:', error);

        if (error.status === 401) {
          alert('Invalid email or password');
        } else if (error.status === 404) {
          alert('Login API not found. Check backend server.');
        } else {
          alert('Login failed. Please try again.');
        }
      }
    });
  }
}