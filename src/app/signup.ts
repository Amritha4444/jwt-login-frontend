import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from './core/auth/auth.service';

@Component({
selector: 'app-signup',
standalone: true,
imports: [CommonModule, FormsModule, RouterLink],
templateUrl: './signup.html',
styleUrls: ['./signup.css']
})
export class SignupComponent {
email = '';
password = '';
confirmPassword = '';
errorMessage = '';
successMessage = '';
isLoading = false;

onSignup(): void {
this.errorMessage = '';
this.successMessage = '';

const email = this.email.trim().toLowerCase();
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Check basic email format
if (!emailPattern.test(email)) {
  this.errorMessage = 'Please enter a valid email address.';
  return;
}

// Catch common Gmail spelling mistakes
const commonTypoDomains = [
  'gmil.com',
  'gmal.com',
  'gmai.com',
  'gmail.con',
  'gamil.com'
];

if (commonTypoDomains.some(domain => email.endsWith('@' + domain))) {
  this.errorMessage = 'Please check your email. Did you mean @gmail.com?';
  return;
}

// Check password length
if (this.password.length < 8) {
  this.errorMessage = 'Password must contain at least 8 characters.';
  return;
}

// Check password confirmation
if (this.password !== this.confirmPassword) {
  this.errorMessage = 'Passwords do not match.';
  return;
}

this.isLoading = true;

this.authService.signup(email, this.password).subscribe({
  next: () => {
    this.isLoading = false;
    this.successMessage = 'Account created successfully! Redirecting to login...';

    setTimeout(() => {
      this.router.navigate(['/login']);
    }, 1000);
  },
  error: (error) => {
    this.isLoading = false;

    if (error.status === 409) {
      this.errorMessage = 'This email is already registered.';
    } else if (error.status === 400) {
      this.errorMessage =
        error.error?.message || 'Please check your details.';
    } else {
      this.errorMessage =
        'Unable to create your account. Please try again.';
    }
  }
});

}

constructor(
private authService: AuthService,
private router: Router
) {}
}