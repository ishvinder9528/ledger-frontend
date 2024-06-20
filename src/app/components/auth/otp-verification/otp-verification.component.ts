import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InputOtpModule } from 'primeng/inputotp';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import {
  HttpClient,
  HttpClientModule,
  HttpHeaders,
} from '@angular/common/http';
import { VerifyOtpService } from '../../../services/auth/verify/verify-otp.service';
import { Router } from '@angular/router';
import {
  checkToken,
  getToken as getTokenEnv,
} from '../../../../environments/environment';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-otp-verification',
  standalone: true,
  imports: [
    FormsModule,
    InputOtpModule,
    ButtonModule,
    CommonModule,
    HttpClientModule,
  ],
  templateUrl: './otp-verification.component.html',
  styleUrl: './otp-verification.component.css',
  providers: [CookieService],
})
export class OtpVerificationComponent {
  ngOnInit() {
    this.haveToken = this.isToken();
    if (!this.haveToken) {
      this.router.navigate(['/login']);
    }
  }

  constructor(
    private http: HttpClient,
    private router: Router,
  ) {}

  haveToken: any;
  value: any;
  data: any = {
    otp: '',
  };
  verifyService = new VerifyOtpService(this.http);
  headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'X-Token': this.getToken(),
  });

  verifying(value: any) {
    this.data.otp = value;
    this.verifyService.verifyOtp(this.data, this.headers).subscribe({
      next: (data: any) => {
        this.router.navigate(['/dashboard']);
      },
      error: (error: any) => {
        console.log('error occured', error);
      },
    });
  }

  resendOtp() {
    this.verifyService.resendOtp(this.headers).subscribe({
      next: (data: any) => {
      },
      error: (error: any) => {
        console.log('error occured', error);
      },
    });
  }

  isToken() {
    return checkToken();
  }
  getToken() {
    return getTokenEnv();
  }
}
