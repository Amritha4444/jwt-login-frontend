import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class Dashboard implements OnInit {

  message = '';
  email = '';

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.authService.getMe().subscribe({
      next: (response) => {
        console.log('User response:', response);

        this.message = response.message;
        this.email = response.data.user.email;
      },
      error: (error) => {
        console.log('Dashboard error:', error);
        this.authService.logout();
      }
    });
  }

  logout() {
    this.authService.logout();
  }
}