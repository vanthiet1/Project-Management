import { Component } from '@angular/core';
import { HeaderComponent } from '../../components/layouts/header/header.component';
import { NavigationComponent } from '../../components/layouts/navigation/navigation.component';

@Component({
  selector: 'app-control',
  standalone: true,
  imports: [HeaderComponent, NavigationComponent],
  templateUrl: './control.component.html',
  styleUrl: './control.component.css',
})
export class ControlComponent {}
