import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'http://localhost:3000/api';

  constructor(
    private http: HttpClient,
    private router: Router
  ) {}

  login(email: string, password: string) {
    return this.http.post<any>(
      `${this.apiUrl}/login`,
      {
        email: email,
        password: password
      }
    );
  }

  signup(email: string, password: string) {
    return this.http.post<any>(
      `${this.apiUrl}/signup`,
      {
        email: email,
        password: password
      }
    );
  }

  saveToken(token: string) {
    localStorage.setItem('token', token);
  }

  getToken() {
    return localStorage.getItem('token');
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }
}