import { Component } from '@angular/core';
import { HeaderComponent } from '../../components/layouts/header/header.component';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-register',
  standalone: true,
  imports: [HeaderComponent,RouterLink,FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  user = {
    fullname:'',
    email: '',
    phoneNumber:'',
    password:'',
  }
  submitRegister(){
  }
  submitRegitser(){
    console.log(this.user);
  }
}
