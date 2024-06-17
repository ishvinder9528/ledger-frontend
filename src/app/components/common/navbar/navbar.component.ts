import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NavigationEnd, Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { AvatarModule } from 'primeng/avatar';
import { BadgeModule } from 'primeng/badge';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { MenubarModule } from 'primeng/menubar';
import { RippleModule } from 'primeng/ripple';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { MenuModule } from 'primeng/menu';
import { CookieService } from 'ngx-cookie-service';
import { checkToken as checkTokenEnv } from '../../../../environments/environment';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    MenubarModule,
    FormsModule,
    CommonModule,
    BadgeModule,
    AvatarModule,
    InputTextModule,
    RippleModule,
    ButtonModule,
    OverlayPanelModule,
    MenuModule,
  ],
  providers: [CookieService],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {
  constructor(private router: Router, private cookieService: CookieService) {}

  ngOnInit(): void {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.currentRoute = this.router.url;
        console.log('current Route:', this.currentRoute);
        this.isToken = this.checkToken();
      }
    });
  }

  items: MenuItem[] = [
    {
      icon: 'pi pi-home',
      label: 'Home',
      command: () => {
        this.router.navigate(['/home']);
      },
    },
    {
      icon: 'pi pi-info',
      label: 'About',
      command: () => {
        this.router.navigate(['/about']);
      },
    },
    {
      icon: 'pi pi-user',
      label: 'Login/Register',
      command: () => {
        this.router.navigate(['/signup']);
      },
    },
  ];

  logoutItem: MenuItem[] = [
    {
      icon: 'pi pi-user',
      label: 'Profile',
      command: () => {
        this.router.navigate(['/profile']);
      },
    },
    {
      icon: 'pi pi-sign-out',
      label: 'Logout',
      command: () => {
        this.logout();
      },
    },
  ];

  _id: any = 'test';
  image: string = `https://avatar.iran.liara.run/public?username=${this._id}`;
  currentRoute: any;
  showMenu: boolean = false;
  isToken: boolean = false;
  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('tokenExpiry');
    this.router.navigate(['/login']);
  }
  checkToken() {
    return checkTokenEnv();
  }
}