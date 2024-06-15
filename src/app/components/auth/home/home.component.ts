import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { StyleClassModule } from 'primeng/styleclass';
import { SignupService } from '../../../services/auth/signup/signup.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { LoaderComponent } from '../../../helpers/loader/loader.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    ButtonModule,
    StyleClassModule,
    RouterLink,
    HttpClientModule,
    LoaderComponent,

  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  constructor(private http: HttpClient) {}

  checkBE: any= undefined;

  ngOnInit() {
    this.checkBackend();
  }

  checkBackend() {
    const signUp = new SignupService(this.http); // Inject SignupService here when needed
    signUp.checkBackend().subscribe({
      next: (data: any) => {
        this.checkBE = data;
        console.log('data:', data);
      },
      error: (error: any) => {
        console.error('An error occurred:', error);
      },
    });
  }
}
