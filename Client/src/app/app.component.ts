import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { HomeComponent } from './pages/home/home.component';
import { ControlComponent } from './pages/control/control.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { HeaderComponent } from './components/layouts/header/header.component';
import { NavigationComponent } from './components/layouts/navigation/navigation.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [NavigationComponent,HeaderComponent,HomeComponent,ControlComponent,LoginComponent,RegisterComponent,RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

export class AppComponent {
  title = 'my-app';
}
