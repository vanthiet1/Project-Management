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
  fetchDataProject(): Observable<any> {
    return this.http.get<any>(`${this.URL_API}/project`);
  }
  fetchDataDeltaiProject(projectId:any): Observable<any> {
    return this.http.get<any>(`${this.URL_API}/project/${projectId}`);
  }

  postProject(data:any):Observable<any> {
    return this.http.post<any>(`${this.URL_API}/project`,data);
  }
  //delete project
  deleteProject(id: string): Observable<any> {
    return this.http.delete<any>(`${this.URL_API}/project/${id}`);
  }
    //cancel project
    cancelProject(id: string): Observable<any> {
      return this.http.put<any>(`${this.URL_API}/project/cancel/${id}`,{});
    }
    // confirm Project
    confirmProject(id: string): Observable<any> {
      return this.http.put<any>(`${this.URL_API}/project/confirm/${id}`,{});
    }
  //  getAllUser
    getAllUser(): Observable<any> {
      return this.http.get<any>(`${this.URL_API}/auth/list/user`);
    }
    //update User
    updateProject(id: string, data: any): Observable<any> {
      return this.http.put<any>(`${this.URL_API}/project/${id}`, data);
    }

 }
