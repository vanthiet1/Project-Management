import { Component } from '@angular/core';
import { MemberComponent } from './members/member.component';
import { TotalComponent } from './total/total.component';
@Component({
  selector: 'app-main-manager',
  standalone: true,
  imports: [MemberComponent,TotalComponent],
  templateUrl: './main-manager.component.html',
  styleUrl: './main-manager.component.css'
})
export class MainManagerComponent {

}
