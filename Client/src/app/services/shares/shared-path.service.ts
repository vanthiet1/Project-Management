import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class SharedPathService {
  private currentPathSubject = new BehaviorSubject<string>('');
  currentPath$ = this.currentPathSubject.asObservable();
  updateCurrentPath(path: string) {
    this.currentPathSubject.next(path);
  }
}
