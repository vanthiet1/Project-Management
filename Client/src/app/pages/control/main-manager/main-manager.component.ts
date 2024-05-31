import { Component, OnInit } from '@angular/core';
import { MemberComponent } from './members/member.component';
import { TotalComponent } from './total/total.component';
import { CommonModule } from '@angular/common';
import { ProjectService } from '../../../services/project/project-list.service';
@Component({
  selector: 'app-main-manager',
  standalone: true,
  imports: [MemberComponent,TotalComponent,CommonModule],
  templateUrl: './main-manager.component.html',
  styleUrl: './main-manager.component.css'
})
export class MainManagerComponent  implements OnInit {
  constructor(private projectService : ProjectService){
  }
  projects: any[] = [];
  ngOnInit(): void {
    this.fetchData();
  }
  fetchData() {
    this.projectService.fetchDataProject().subscribe({
      next: (data) => {
        this.projects = data;
      },
      error: (err) => {
        console.error('Error fetching projects', err);
      },
    });
  }
}
