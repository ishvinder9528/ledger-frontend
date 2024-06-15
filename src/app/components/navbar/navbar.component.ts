import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { AvatarModule } from 'primeng/avatar';
import { BadgeModule } from 'primeng/badge';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { MenubarModule } from 'primeng/menubar';
import { RippleModule } from 'primeng/ripple';
import { OverlayPanelModule } from 'primeng/overlaypanel';import { MenuModule } from 'primeng/menu';
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
    MenuModule
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {
  constructor(private router: Router) {}

  ngOnInit(): void {
    this.router.events.subscribe(() => {
      this.currentRoute = this.router.url;
      console.log('current Route:', this.currentRoute);
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
    },    {
      icon: 'pi pi-sign-out',
      label: 'Logout',
      command: () => {
        this.router.navigate(['/login']);
      },
    },
  ];

  _id: any = 'test';
  image: string = `https://avatar.iran.liara.run/public?username=${this._id}`;
  currentRoute: any;
  showMenu: boolean = false;
  logout() {
    this.router.navigate(['/login']);
  }
}
