import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class IsLoginService {
  private URL_API = 'http://localhost:8080/api/v1';

  constructor(private router: Router, private http: HttpClient) {}

  isLogin(): boolean {
    const accessToken = localStorage.getItem('accessToken');
    if (!accessToken) {
      this.router.navigate(['/login']);
      return false;
    }
    return true;
  }

  logout(): void {
    localStorage.removeItem('accessToken');
    this.router.navigate(['/login']);
  }

  validateToken(): Observable<boolean> {
    const accessToken = localStorage.getItem('accessToken');
    if (!accessToken) {
      return of(false);
    }
    return this.http.get<any>(`${this.URL_API}/auth`, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    }).pipe(
      map(() => true),
      catchError(() => {
        this.logout();
        return of(false);
      })
    );
  }
}
