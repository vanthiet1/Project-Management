import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectService } from '../../../services/project/project-list.service';
@Component({
  selector: 'app-members-manager',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './members-manager.component.html',
  styleUrl: './members-manager.component.css',
})
export class MembersManagerComponent implements OnInit {
  projects: any[] = [];
  employeeInProject: any[] = [];

  error: string | undefined;

  constructor(private projectService: ProjectService) {}

  ngOnInit(): void {
    this.fetchData();
  }

  fetchData() {
    this.projectService.fetchDataProject().subscribe({
      next: (data) => {
        this.projects = data;
        console.log(data);
      },
      error: (err) => {
        this.error = 'Failed to load projects. Please try again later.';
        console.error('Error fetching projects', err);
      },
    });
  }
}
