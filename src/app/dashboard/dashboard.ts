import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class Dashboard {

  message = '';
  email = '';

  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {

    const token = this.authService.getToken();

    if (!token) {
      this.router.navigate(['/login']);
      return;
    }

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });

    this.http.get<any>(
      'http://localhost:3000/api/auth/me',
      { headers }
    ).subscribe({

      next: (response) => {
        console.log('Dashboard response:', response);

        this.message = response.message;

        if (response.data && response.data.user) {
          this.email = response.data.user.email;
        }
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