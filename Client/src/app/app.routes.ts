import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ControlComponent } from './pages/control/control.component';
import { RegisterComponent } from './pages/register/register.component';
import { LoginComponent } from './pages/login/login.component';

export const routes: Routes = [
  { path: '',component: HomeComponent  },
  { path: 'control', component: ControlComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
];
