import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  private URL_API = 'http://localhost:8080/api/v1';

  constructor(private http: HttpClient) { }
//  render
  fetchComments(): Observable<any> {
    return this.http.get<any>(`${this.URL_API}/project`);
  }
  //delete project
  deleteProject(id: string): Observable<any> {
    return this.http.delete<any>(`${this.URL_API}/project/${id}`);
  }

 }
