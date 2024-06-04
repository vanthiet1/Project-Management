import { CommonModule } from '@angular/common';
import { Component, OnInit  } from '@angular/core';
import { AuthInterceptorService } from '../../../services/auth/auth-interceptor.service';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})
export class MainAdminComponent implements OnInit {
   constructor(
    private authInterceptorService:AuthInterceptorService
  ){
   }
   listData:any[] = []
  ngOnInit(): void {
    this.fetchData()
  }
   fetchData() {
    this.authInterceptorService.getAllUser().subscribe({
      next: (data) => {
          this.listData = data
      },
      error: (err) => {
          console.log(err);
      },
    });
  }
  updateRole(idUser:any){
    this.authInterceptorService.updateRoleMember(idUser).subscribe(() => {
      this.fetchData();
    });

  }

}
