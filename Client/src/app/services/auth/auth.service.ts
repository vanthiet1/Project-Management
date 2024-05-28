import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private URL_API  = 'http://localhost:8080/api/v1';
  constructor(private http: HttpClient) {}

  register(data: any): Observable<any> {
    return this.http.post<any>(`${this.URL_API}/user/register`, data);
  }

  login(data:object): Observable<any> {
    return this.http.post<any>(`${this.URL_API}/user/login`, data);
  }
  
}
