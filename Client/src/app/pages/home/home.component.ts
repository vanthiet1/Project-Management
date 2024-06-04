import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';

import { HeaderComponent } from '../../components/layouts/header/header.component';
import { NavigationComponent } from '../../components/layouts/navigation/navigation.component';
import { MemberProjectService } from '../../services/memberProject/member-project.service';
import { AuthInterceptorService } from '../../services/auth/auth-interceptor.service';
import { ProjectService } from '../../services/project/project-list.service';
import { TaskProjectService } from '../../services/task/task.service';
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
    private authService: AuthInterceptorService,
    private projectService: ProjectService,
    private taskProjectService: TaskProjectService
  ) {}

  showMemberProject:boolean = false;

  memberDetailProject: any = {};
  memberAllProject: any[] = [];
  memberInProject: any[] = [];
  statusWorking:boolean | undefined;
  nameProject:string | undefined

  userId: any;
  isAdmin: any;
  taskProject:any[] = [];
  memberClaimTask:any[] = [];

  formShowTask:boolean = false;
  idProject: any;
  ngOnInit(): void {
    this.loadUserInfo();
    this.fetchDataMemberProject();
    this.fetchDataMemberAllProject();
  }

  loadUserInfo() {
    this.authService.getUserInfo().subscribe(
      (data: any) => {
        this.userId = data?._id;
        this.isAdmin = data.roles.includes('admin');
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
        //  data.map((idProject:any)=>{
        //    this.idProject = idProject.employeeProjects
        //    console.log( this.idProject);

        // })
        this.memberAllProject = data;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  showMemberInProject(projectId:any) {
    this.projectService.fetchDataDeltaiProject(projectId).subscribe({
      next: (data) => {
        this.memberInProject = data?.anProject?.teamProject
        this.nameProject = data?.anProject?.nameProject
        this.showMemberProject  = true
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  leaveProject(projectId: string) {
    this.memberProjectService.leaveProject(this.userId, projectId).subscribe({
      next: (res) => {
        if (!projectId) {
          return;
        }
        this.memberDetailProject.employeeProjects =
          this.memberDetailProject.employeeProjects.filter(
            (project: any) => project._id !== projectId
          );
        this.fetchDataMemberProject();
      },
    });
  }


  showTask(idProject:any){
      this.idProject = idProject;
    this.projectService.fetchDataDeltaiProject(idProject).subscribe({
      next: (data) => {
          this.taskProject = data.anProject.tasks
      },

      error: (err) => {
        console.log(err.message);
      },
    });
     this.formShowTask = true
  }
  confirmTask(idTask:any){
    this.taskProjectService.confirmTaskProject(idTask).subscribe(() => {
      this.showTask(this.idProject);
    });
  }

  closeModelAddTask(){
    this.formShowTask = false
  }

}
