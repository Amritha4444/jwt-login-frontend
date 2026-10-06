import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
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

  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {

    this.http.get<any>(
      'http://localhost:3000/api/dashboard'
    ).subscribe({
      next: (response) => {
        console.log('Dashboard response:', response);
        this.message = response.message;
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