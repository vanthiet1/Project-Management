import { TaskProjectService } from './../../../services/task/task.service';
import { Component, OnInit } from '@angular/core';
import { AuthInterceptorService } from '../../../services/auth/auth-interceptor.service';
import { ProjectService } from '../../../services/project/project-list.service';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-table-manager',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './table-manager.component.html',
  styleUrl: './table-manager.component.css'
})
export class TableManagerComponent implements OnInit {
  constructor(
    private authInterceptorService:AuthInterceptorService,
    private projectService:ProjectService,
    private taskProjectService:TaskProjectService
  ){}
  quantityMember:number | undefined
  allPriceTotalProject:number | undefined
  allTaskProject:number | undefined
  nameProject: string | undefined

  ngOnInit(): void {
    this.fetchAllMember()
    this.fetchAllProject()
    this.fetchAllTaskProject()
  }
  fetchAllMember() {
    this.authInterceptorService.getAllUser().subscribe({
      next: (data) => {
       this.quantityMember = data.length
      },
      error: (err) => {
        console.log(err);

      },
    });
  }
  fetchAllProject(){
    this.projectService.fetchDataProject().subscribe({
      next: (data) => {
        this.allPriceTotalProject = data.reduce((acc:any,project:any)=> acc + project. feeProject ,0)
        this.nameProject = data.map((nameProject:any) => nameProject.nameProject)
      },
      error: (err) => {
        console.log(err);

      },
    });
  }
  fetchAllTaskProject(){
    this.taskProjectService.getAllTaskProject().subscribe({
      next: (data) => {
         this.allTaskProject = data.length
      },
      error: (err) => {
        console.log(err);

      },
    });
  }

}
