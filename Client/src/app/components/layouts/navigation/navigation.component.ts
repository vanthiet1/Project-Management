import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedPathService } from '../../../services/shares/shared-path.service';
import { AuthInterceptorService } from '../../../services/auth/auth-interceptor.service';
@Component({
  selector: 'app-navigation',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.css',
})
export class NavigationComponent implements OnInit {
  currentPath: string = '';
  isAdmin:boolean | undefined
  userInfo:any
  constructor(
    private sharedService: SharedPathService,
    private authService:AuthInterceptorService

  ) {}
  ngOnInit() {
    this.sharedService.currentPath$.subscribe((path: string) => {
      this.currentPath = path;
    });
    this.loadUserInfo()
  }
  loadUserInfo() {
    this.authService.getUserInfo().subscribe(
      (data: any) => {
        this.userInfo = data;
        this.isAdmin = data.roles.includes('admin');
      },
      (error: any) => {
        console.error('Failed to fetch user info', error);
      }
    );
  }
}
