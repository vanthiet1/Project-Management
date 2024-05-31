import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ControlComponent } from './pages/control/control.component';
import { RegisterComponent } from './pages/register/register.component';
import { LoginComponent } from './pages/login/login.component';
import { ProjectComponent } from './pages/project/project.component';
import { MainAdminComponent } from './pages/admin/main/main.component';
import { CanactiveData } from './auth/authRouter';


export const routes: Routes = [
  { path: '', component: HomeComponent  },
  {
    path: 'control',
    component: ControlComponent,
   canActivate: [CanactiveData]
   },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'project', component: ProjectComponent },
  {
  path: 'admin',
   component: MainAdminComponent,
   canActivate: [CanactiveData]
   },
];
