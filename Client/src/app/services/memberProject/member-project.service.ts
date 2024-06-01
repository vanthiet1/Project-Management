import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MemberProjectService {
  private URL_API = 'http://localhost:8080/api/v1';

  constructor(private http: HttpClient) { }

  getMemberProjectDetail(id:string): Observable<any> {
    return this.http.get<any>(`${this.URL_API}/member/project/${id}`,{});
  }
  getMemberAllProject(): Observable<any> {
    return this.http.get<any>(`${this.URL_API}/member/project`);
  }
  leaveProject(userId: string, projectId: string): Observable<any> {
    return this.http.delete<any>(`${this.URL_API}/member/project/${userId}/${projectId}`);
  }

}
