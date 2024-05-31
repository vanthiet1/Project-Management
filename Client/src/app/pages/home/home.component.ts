import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';

import { HeaderComponent } from '../../components/layouts/header/header.component';
import { NavigationComponent } from '../../components/layouts/navigation/navigation.component';
import { MemberProjectService } from '../../services/memberProject/member-project.service';
import { AuthInterceptorService } from '../../services/auth/auth-interceptor.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, HeaderComponent, NavigationComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  constructor(
    private memberProjectService: MemberProjectService,
    private authService: AuthInterceptorService
  ) {}

  memberProject:any= {};
  userId: any;
  isAdmin:any;

  ngOnInit(): void {
    this.loadUserInfo();
  }

  loadUserInfo() {
    this.authService.getUserInfo().subscribe(
      (data: any) => {
        this.userId = data?._id;
        this.isAdmin = data.roles.includes("admin");
        this.fetchDataMemberProject();
      },

      (error: any) => {
        console.error('Failed to fetch user info', error);
      }
    );
  }

  fetchDataMemberProject() {
    if (!this.userId) {
      console.error('Không có id user');
      return;
    }

    this.memberProjectService.getMemberProjectDetail(this.userId).subscribe({
      next: (data) => {
        console.log(data);
        this.memberProject = data;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
