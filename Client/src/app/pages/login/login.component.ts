import { Component } from '@angular/core';
import { HeaderComponent } from '../../components/layouts/header/header.component';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth/auth.service';
// import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [HeaderComponent, RouterLink, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})

export class LoginComponent {
  constructor(private authService: AuthService) {}

  dataUserLogin = {
    email: '',
    password: '',
  };

  submitLogin() {
    try {
      this.authService.login(this.dataUserLogin).subscribe(
        (response) => {
          console.log('Đăng nhập thành công', response);
          const accessToken = response.accessToken;
          if (typeof window !== 'undefined' && window.localStorage) {
            localStorage.setItem('accessToken', accessToken);
          }
          window.location.href='/'
        },
        (error) => {
          console.error('Đăng nhập thất bại', error.message);
          if (error && error.error && error.error.message) {
            const errorMessage = error.error.message;
            console.error('Thông báo lỗi từ máy chủ:', errorMessage);
          }
        }
      );
    } catch (error) {
      console.error('An error occurred during registration', error);
    }
  }

}
