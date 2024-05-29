import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthInterceptorService {
  private URL_API = 'http://localhost:8080/api/v1';

  constructor(private http: HttpClient) {}

  getUserInfo(): Observable<any> {
    const token = localStorage.getItem('accessToken');
    if (!token) {
      return throwError('No access token found');
    }

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    return this.http.get<any>(`${this.URL_API}/auth`, { headers }).pipe(
      catchError((error) => {
        console.error('Error fetching user info:', error);
        return throwError(error);
      })
    );
  }

  

}
