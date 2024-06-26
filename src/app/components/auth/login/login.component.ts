import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AnimateModule } from 'primeng/animate';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { InputTextModule } from 'primeng/inputtext';
import { StyleClassModule } from 'primeng/styleclass';
import { SignupComponent } from '../signup/signup.component';
import {
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  HttpClient,
  HttpClientModule,
  HttpHeaders,
} from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { DialogModule } from 'primeng/dialog';
import { DividerModule } from 'primeng/divider';
import { FloatLabelModule } from 'primeng/floatlabel';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { PasswordModule } from 'primeng/password';
import { LoginService } from '../../../services/auth/login/login.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    FormsModule,
    SignupComponent,
    ButtonModule,
    CheckboxModule,
    StyleClassModule,
    AnimateModule,
    InputTextModule,
    RouterLink,
    LoginComponent,
    DividerModule,
    CommonModule,
    FloatLabelModule,
    ReactiveFormsModule,
    PasswordModule,
    IconFieldModule,
    InputIconModule,
    DialogModule,
    HttpClientModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) {}

  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: [
      '',
      [
        Validators.required,
        Validators.minLength(6),
        Validators.pattern(/.*[a-z].*/),
        Validators.pattern(/.*[A-Z].*/),
        Validators.pattern(/.*\d.*/),
      ],
    ],
    terms: [false],
  });

  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }

  hasLowercase() {
    return /[a-z]/.test(this.loginForm.get('password')?.value ?? '');
  }

  hasUppercase() {
    return /[A-Z]/.test(this.loginForm.get('password')?.value ?? '');
  }

  hasNumeric() {
    return /\d/.test(this.loginForm.get('password')?.value ?? '');
  }

  isMinLength() {
    const length: any = this.loginForm.get('password')?.value?.length ?? 0;
    return length >= 6;
  }

  showTerms: any;
  headers = new HttpHeaders({
    'Content-Type': 'application/json',
  });

  onSubmit() {
    const loginService = new LoginService(this.http);
    loginService.login(this.loginForm.value, this.headers).subscribe({
      next: (data: any) => {
        if (data.ok) {
          const expiryTime = Date.now() + 24 * 60 * 60 * 1000;
          localStorage.setItem('token', data.body.token);
          localStorage.setItem('tokenExpiry', expiryTime.toString());
          this.router.navigate(['/dashboard']);
        } else {
          alert('some error');
        }
      },
      error: (error: any) => {
        alert(`some Error: ${error}`);
      },
    });
  }
}
