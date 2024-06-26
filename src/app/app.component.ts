import { Component } from '@angular/core';
import {
  RouterLink,
  RouterLinkActive,
  RouterModule,
  RouterOutlet,
  Routes,
} from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { ImageModule } from 'primeng/image';
import { StyleClassModule } from 'primeng/styleclass';
import { PageNotFoundComponent } from './components/common/page-not-found/page-not-found.component';
import { NavbarComponent } from './components/common/navbar/navbar.component';
import { TooltipModule } from 'primeng/tooltip';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    ButtonModule,
    ImageModule,
    StyleClassModule,
    PageNotFoundComponent,
    NavbarComponent,
    TooltipModule,
    RouterModule,
    HttpClientModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'myapp';
}
