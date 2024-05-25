import { Component } from '@angular/core';
import { HeaderComponent } from '../../components/layouts/header/header.component';
import { NavigationComponent } from '../../components/layouts/navigation/navigation.component';
import { TableManagerComponent } from './table-manager/table-manager.component';
import { MainManagerComponent } from './main-manager/main-manager.component';
import { MembersManagerComponent } from './members-manager/members-manager.component';
@Component({
  selector: 'app-control',
  standalone: true,
  imports: [HeaderComponent, NavigationComponent,MainManagerComponent,TableManagerComponent ,MembersManagerComponent],
  templateUrl: './control.component.html',
  styleUrl: './control.component.css',
})
export class ControlComponent {
  // avatarLeader = 'https://avatars.google.com'
}
