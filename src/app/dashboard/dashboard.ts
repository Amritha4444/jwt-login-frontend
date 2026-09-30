import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class Dashboard implements OnInit {

  message = '';

  constructor(private http: HttpClient) {}

  ngOnInit() {

    const token = localStorage.getItem('token');

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });

    this.http.get<any>(
      'http://localhost:3000/api/dashboard',
      { headers }
    ).subscribe({
      next: (response) => {
        console.log('Dashboard response:', response);
        this.message = response.message;
      },

      error: (error) => {
        console.log('Dashboard error:', error);
        this.message = 'Access denied';
      }
    });
  }

  logout() {
    localStorage.removeItem('token');
    window.location.href = '/login';}}