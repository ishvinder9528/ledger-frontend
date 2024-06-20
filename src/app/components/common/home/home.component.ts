import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { StyleClassModule } from 'primeng/styleclass';
import { SignupService } from '../../../services/auth/signup/signup.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { LoaderComponent } from '../../helpers/loader/loader.component';
import { checkToken } from '../../../../environments/environment';

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
  constructor(private http: HttpClient,private router:Router) {}

  checkBE: any = undefined;

  ngOnInit() {
    this.checkBackend();
    if(this.hasToken()){
      this.router.navigate(['/dashboard'])
    }
  }

  checkBackend() {
    const signUp = new SignupService(this.http);
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
  
  hasToken(){
    return checkToken()
  }
}
