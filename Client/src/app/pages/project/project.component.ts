import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProjectService } from '../../services/project/project-list.service';
@Component({
  selector: 'app-project',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './project.component.html',
  styleUrl: './project.component.css'
})
export class ProjectComponent implements OnInit  {
  showModal = false;
  list = [
    { id: 1, name: 'User 1', checked: false },
    { id: 2, name: 'User 2', checked: false },
    { id: 3, name: 'User 3', checked: false },
    { id: 4, name: 'User 4', checked: false },
    { id: 5, name: 'User 5', checked: false }

  ];

  toggleUserSelection(user: any): void {
    user.checked = !user.checked;
  }

  showModalAddProject() {
    this.showModal = true;
  }
  closeModalAddProject(){
    this.showModal = false
  }
  projects: any[] = [];
  constructor(private projectService: ProjectService) {}
  ngOnInit(): void {
    this.projectService.fetchComments().subscribe(
      (data) => {
        this.projects = data;
        console.log(data);

      },
      (error) => {
        console.error('Error fetching projects:', error);
      }
    );
  }

}
