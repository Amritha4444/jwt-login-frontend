import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../core/auth/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class LoginComponent {

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

        // Save JWT token returned by TypeScript backend
        if (response && response.data && response.data.token) {

          this.authService.saveToken(response.data.token);

          alert('Login successful');

          // Go to dashboard
          this.router.navigate(['/dashboard']);

        } else {

          console.error('Token not found in response');
          alert('Login successful, but token was not received.');

        }
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