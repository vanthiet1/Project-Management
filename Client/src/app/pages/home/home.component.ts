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

  memberDetailProject:any= {};
  memberAllProject:any[]= [];

  userId: any;
  isAdmin:any;

  ngOnInit(): void {
    this.loadUserInfo();
  this.fetchDataMemberProject()
  this.fetchDataMemberAllProject()

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
        this.memberDetailProject = data;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  fetchDataMemberAllProject() {
    this.memberProjectService.getMemberAllProject().subscribe({
      next: (data) => {
        this.memberAllProject = data;
        console.log(this.memberAllProject);

      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  leaveProject(projectId:string){
      this.memberProjectService.leaveProject(this.userId,projectId).subscribe({
        next: (res)=>{
          if(!projectId){
            return;
          }
           this.memberDetailProject.employeeProjects = this.memberDetailProject.employeeProjects.filter( (project:any)=> project._id !== projectId)
           this.fetchDataMemberProject()

        }
      })
  }
}
