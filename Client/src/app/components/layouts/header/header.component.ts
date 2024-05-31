import { Component, OnInit } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CommonModule } from '@angular/common';
import { NavigationEnd, Router, RouterLink } from '@angular/router';
import { SearchComponent } from '../../search/search.component';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { SharedPathService } from '../../../services/shares/shared-path.service';
import { RegisterComponentButton } from '../../button/register/register.component';
import { LoginComponentButton } from '../../button/login/login.component';
import { AuthInterceptorService } from '../../../services/auth/auth-interceptor.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    FontAwesomeModule,
    CommonModule,
    RouterLink,
    SearchComponent,
    RegisterComponentButton,
    LoginComponentButton,
  ],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  userInfo: any;
  errorMessage: string | undefined;

   isLogin:boolean = true;
   isAdmin:boolean = false;


  listPagename = [
    {
      name: 'Quản lí dự án foply',
      path: '',
    },

    {
      name: 'Dự Án',
      path: 'project',
    },
  ];
  currentPageName: string | undefined;

  constructor(
    private router: Router,
    private sharedService: SharedPathService,
    private authService: AuthInterceptorService
  ) {}

  ngOnInit() {
    this.router.events.subscribe((val: any) => {
      if (val instanceof NavigationEnd) {
        const foundPage = this.listPagename.find(
          (page) => `/${page.path}` === val.urlAfterRedirects
        );
        this.currentPageName = foundPage ? foundPage.name : '';
        this.sharedService.updateCurrentPath(this.currentPageName);
      }
    });

    this.loadUserInfo();
  }

  loadUserInfo() {
    this.authService.getUserInfo().subscribe(
      (data: any) => {
        this.userInfo = data;
        this.isLogin = true;
        this.isAdmin = data.roles.includes('admin');
       if(this.isAdmin){
         this.listPagename.push(  {
          name: 'Bảng Điều Khiển',
          path: 'control',
        },)
       }

      },
      (error: any) => {
        console.error('Failed to fetch user info', error);
        this.isLogin = false;
      }
    );
  }

  logout() {
    localStorage.removeItem('accessToken');
    this.router.navigate(['/login']);
    this.isLogin = false;
    this.userInfo = null;
    this.isAdmin = false;
  }

  faSearch = faSearch;

  logo =
    'data:image/jpeg;base64,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';
}
