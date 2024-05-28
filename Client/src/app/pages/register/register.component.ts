import { Component } from '@angular/core';
import { HeaderComponent } from '../../components/layouts/header/header.component';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth/auth.service';
@Component({
  selector: 'app-register',
  standalone: true,
  imports: [HeaderComponent,RouterLink,FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  dataUserRegister  = {
    fullname:'',
    email: '',
    phoneNumber:'',
    password:'',
  }
  constructor(private authService: AuthService ) {}
  submitRegistser() {
    try {
      this.authService.register(this.dataUserRegister).subscribe(
        response => {
          console.log('Đăng ký thành công', response);
        },
        error => {
          console.error('Đăng ký thất bại', error);
        }
      );
    } catch (error) {
      console.error('An error occurred during registration', error);
    }
  }
}
