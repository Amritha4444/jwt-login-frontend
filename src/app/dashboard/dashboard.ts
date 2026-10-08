import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../auth.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
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

  ngOnInit(): void {
    const token = this.authService.getToken();

    if (!token) {
      this.router.navigate(['/login']);
      return;
    }

    this.authService.getMe().subscribe({
      next: (response) => {
        this.message = response.message;
        this.email = response.data?.user?.email || '';
      },
      error: () => {
        this.authService.logout();
      }
    });
  }

  logout(): void {
    this.authService.logout();
  }
}