import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ProjectService } from '../../services/project/project-list.service';
import { AuthInterceptorService } from '../../services/auth/auth-interceptor.service';
import { IsLoginService } from '../../services/auth/isLogin.service';

@Component({
  selector: 'app-project',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css'],
})
export class ProjectComponent implements OnInit {
  showModal = false;
  isLoading: boolean | undefined;
  error: string | undefined;
  isEditing: boolean = false;
  editingProjectId: string | null = null;
  //
  projectName: string = '';
  startDate: string = '';
  teamSize: number = 0;
  list: Array<{ fullname: string; checked: boolean; _id: string }> = [];
  projects: any[] = [];
  selectedUsers: any[] = [];

  // infor user
  isAdmin: boolean | undefined;
  inforUser: any = {};
  userLogin: boolean | undefined;

  constructor(
    private projectService: ProjectService,
    private authService: AuthInterceptorService,
    private isLoginService: IsLoginService,
    private router: Router
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

  toggleUserSelection(user: any) {
    user.checked = !user.checked;
  }

  showModalAddProject() {
    this.showModal = true;
  }
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
    if (!this.isLoginService.isLogin()) {
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

  cancelProject(id: string): void {
    if (!this.isLoginService.isLogin()) {
      return;
    } else {
      this.projectService.cancelProject(id).subscribe(() => {
        this.fetchData();
      });
    }
  }

  confirmProject(id: string): void {
    if (!this.isLoginService.isLogin()) {
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
    if (!this.isLoginService.isLogin()) {
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
    this.list.forEach(user => {
      user.checked = project.teamProject.includes(user._id);
    });
    this.showModal = true;
  }


}
