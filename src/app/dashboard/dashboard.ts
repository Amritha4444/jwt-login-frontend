import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

import { AuthService } from '../auth.service';
import { environment } from '../../environment';

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
    private http: HttpClient,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const token = this.authService.getToken();

    if (!token) {
      this.router.navigate(['/login']);
      return;
    }

    this.http.get<any>(`${environment.apiUrl}/auth/me`).subscribe({
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