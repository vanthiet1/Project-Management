import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { AuthInterceptorService } from '../services/auth/auth-interceptor.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CanactiveData implements CanActivate {
  constructor(private authService: AuthInterceptorService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    return new Observable<boolean>((observer) => {
      this.authService.getUserInfo().subscribe(
        (data: any) => {
          console.log(data);
          const isAdmin = data.roles.includes('admin');
            console.log(isAdmin);

          if (isAdmin) {
            observer.next(true);
            observer.complete();
          } else {
            this.router.navigate(['']);
            observer.next(false);
            observer.complete();
          }
        },
        (error: any) => {
          console.error('Failed to fetch user info', error);
          this.router.navigate(['']);
          observer.error(false);
        }
      );
    });
  }
}
