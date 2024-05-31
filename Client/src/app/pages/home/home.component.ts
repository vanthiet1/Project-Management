import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';

import { HeaderComponent } from '../../components/layouts/header/header.component';
import { NavigationComponent } from '../../components/layouts/navigation/navigation.component';
import { MemberProjectService } from '../../services/memberProject/member-project.service';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, HeaderComponent, NavigationComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent  implements OnInit {
  constructor(private memberProjectService:MemberProjectService) {}
  memberProject: any[] = []
  ngOnInit(): void {
    this.fetchDataMemberProject();
  }
  fetchDataMemberProject() {
    this.memberProjectService.getMemberProjectDetail("6653e446decc737c8c3513a3").subscribe({
      next: (data) => {
     console.log(data);

      },
      error: (err) => {
         console.log(err);

      },
    });
  }
}
