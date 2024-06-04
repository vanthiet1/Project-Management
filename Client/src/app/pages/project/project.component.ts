import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ProjectService } from '../../services/project/project-list.service';
import { AuthInterceptorService } from '../../services/auth/auth-interceptor.service';
import { IsLoginService } from '../../services/auth/isLogin.service';
import { TaskProjectService } from '../../services/task/task.service';
@Component({
  selector: 'app-project',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css'],
})
export class ProjectComponent implements OnInit {
  showModal = false;
  showModalAddTask = false
  isLoading: boolean | undefined;
  error: string | undefined;
  isEditing: boolean = false;
  editingProjectId: string | null = null;
  //
  //  định nghĩa trước biến đẻ lưu dữ liệu
  projectName: string = '';
  startDate: string = '';
  teamSize: number = 0;
  feeProject:number = 0
  list: Array<{ fullname: string; checked: boolean; _id: string; statusWorking:boolean }> = [];
  projects: any[] = [];
  selectedUsers: any[] = [];
  contentTask:string | undefined
  startDateDeadline:string = ''
  selectedProjectId: string | null = null;
  // infor user
  isAdmin: boolean | undefined;
  inforUser: any = {};
  userLogin: boolean | undefined;

  constructor(
    private projectService: ProjectService,
    //
    private authService: AuthInterceptorService,
    private isLoginService: IsLoginService,
    private router: Router,
    private taskProjectService: TaskProjectService
  ) {}

  ngOnInit(): void {
    this.isLoginService.validateToken().subscribe(isValid => {
      if (!isValid) {
        this.router.navigate(['/login']);
      }
    });
    this.fetchData();
    this.loadUsers();
    this.loadUserInfo();
  }

  formatFeeProject(value: number): string {
    return value.toLocaleString('en-US') + ' VND';
  }

  toggleUserSelection(user: any) {
    user.checked = !user.checked;
  }
// show model
  showModalAddProject() {
    this.showModal = true;
  }

  showAddTask(projectId: string) {
    this.selectedProjectId = projectId;
    this.showModalAddTask = true;
  }
  closeModalAddTask(){
    this.showModalAddTask = false;
  }


  //
  showForm(){
    this.showModal = true;
  }
  closeModal() {
    this.showModal = false;
    this.isEditing = false;
    this.editingProjectId = null;
    this.projectName = '';
    this.startDate = '';
    this.teamSize = 0;
    this.list.forEach(user => user.checked = false);
  }


  fetchData() {
    this.projectService.fetchDataProject().subscribe({
      next: (data) => {
        this.projects = data.map((project: any) => ({
          ...project,
          dayStart: project.dayStart.split('T')[0],
        }));
        this.isLoading = false;
      },
      error: (err) => {
        this.error = 'Failed to load projects';
        this.isLoading = false;
      },
    });
  }
  loadUsers() {
    this.projectService.getAllUser().subscribe(
      (users) => {
        this.list = users.map((user: any) => ({
          ...user,
          checked: false,
        }));
      },
      (error) => {
        console.error('Error loading users', error);
      }
    );
  }

  deleteProject(id: string): void {
    if (!this.isLoginService.isLogin() || !this.isAdmin) {
      alert("Bạn không có quyền xóa dự án")
      return;
    } else {
      this.projectService.deleteProject(id).subscribe({
        next: () => {
          this.projects = this.projects.filter((project) => project._id !== id);
        },
        error: (err) => {
          console.error('Failed to delete project:', err);
        },
      });
    }
  }

  toggleProjectStatus(project: any) {
    if (project.statusProject) {
      this.cancelProject(project._id);
    } else {
      this.confirmProject(project._id);
    }
    project.statusProject = !project.statusProject;
  }
  cancelProject(id: string): void {
    if (!this.isLoginService.isLogin() || !this.isAdmin ) {
      alert("Bạn không có quyền hủy dự án")
      return;
    } else {
      this.projectService.cancelProject(id).subscribe(() => {
        this.fetchData();
      });
    }
  }

  confirmProject(id: string): void {
    if (!this.isLoginService.isLogin() || !this.isAdmin) {
      alert("Bạn không có quyền xác nhận dự án")
      return;
    } else {
      this.projectService.confirmProject(id).subscribe(() => {
        this.fetchData();
      });
    }
  }

  loadUserInfo() {
    this.authService.getUserInfo().subscribe(
      (data: any) => {
        this.inforUser = data;
        this.isAdmin = this.inforUser?.roles?.includes('admin');
      },
      (error: any) => {
        console.error('Failed to fetch user info', error);
      }
    );
  }

  addProject() {
      if (!this.isLoginService.isLogin() || !this.isAdmin ) {
        alert("Bạn là nhân viên không thể thêm dự án")
      return;
    } else {
      const selectedUsers = this.list
        .filter((user) => user.checked)
        .map((user) => user._id);
      const formattedDate = new Date(this.startDate);

      const newProject = {
        nameProject: this.projectName || null,
        dayStart: formattedDate || null,
        sizeTeam: this.teamSize || null,
        feeProject: this.feeProject || null,
        teamProject: selectedUsers || null,
      };

      if (this.isEditing && this.editingProjectId) {
        this.projectService.updateProject(this.editingProjectId, newProject).subscribe(
          () => {
            this.fetchData();
            this.closeModal();
          },
          (error) => {
            console.error('Error updating project', error);
          }
        );
      } else {
        this.projectService.postProject(newProject).subscribe(
          () => {
            this.fetchData();
            this.closeModal();
          },
          (error) => {
            console.error('Error adding project', error);
          }
        );
      }
    }
  }



  openModalForEdit(project: any) {
    this.isEditing = true;
    this.editingProjectId = project._id;
    this.projectName = project.nameProject;
    this.startDate = new Date(project.dayStart).toISOString().split('T')[0];
    this.teamSize = project.sizeTeam;
    this.feeProject =  project.feeProject

    const projectTeamIds = project.teamProject.map((member: any) => member._id);
    this.list.forEach(user => {
      user.checked = projectTeamIds.includes(user._id);
    });
    this.showModal = true;
  }
  // postTaskProject
  addTaskProject() {
    const selectedUsers = this.list.filter(user => user.checked).map(user => user._id);

    if (this.selectedProjectId) {
      const formattedDate = new Date(this.startDateDeadline);
      const newTaskProject = {
      teamTask: selectedUsers || null,
      idProjects: this.selectedProjectId || null,
      contentTask: this.contentTask || null,
      startDateDeadline: formattedDate || null,
    };
    console.log(newTaskProject);

      this.taskProjectService.postTaskProject(newTaskProject).subscribe(
        () => {
          this.fetchData();
          this.showModalAddTask = false
        },
        (error) => {
          alert(error.error.message)
        }
      );
    }
}
}
