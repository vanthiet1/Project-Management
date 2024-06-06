import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TaskProjectService {
  private URL_API = 'http://localhost:8080/api/v1';

  constructor(private http: HttpClient) { }

  postTaskProject(data:any): Observable<any> {
    return this.http.post<any>(`${this.URL_API}/project/task/member/addtask`,data);
  }

  getAllTaskProject(): Observable<any> {
    return this.http.get<any>(`${this.URL_API}/project/task/member`,{});
  }
  confirmTaskProject(id:any): Observable<any> {
    return this.http.put<any>(`${this.URL_API}/project/task/member/confirm/success/${id}`,{});
  }


}
