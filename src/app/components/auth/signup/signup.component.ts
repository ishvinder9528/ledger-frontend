import { Component, Injectable } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AnimateModule } from 'primeng/animate';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { InputTextModule } from 'primeng/inputtext';
import { StyleClassModule } from 'primeng/styleclass';
import { LoginComponent } from '../login/login.component';
import { PasswordModule } from 'primeng/password';
import { DividerModule } from 'primeng/divider';
import { CommonModule } from '@angular/common';
import { FloatLabelModule } from 'primeng/floatlabel';
import { ReactiveFormsModule } from '@angular/forms';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { DialogModule } from 'primeng/dialog';
import { CardModule } from 'primeng/card';
import {
  HttpClient,
  HttpClientModule,
  HttpHeaders,
  HttpResponse,
} from '@angular/common/http';
import { SignupService } from '../../../services/auth/signup/signup.service';
import { map } from 'rxjs';

@Component({
  selector: 'app-signup',
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
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css',
})
@Injectable({ providedIn: 'root' })
export class SignupComponent {
  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) {}

  registerForm = this.fb.group({
    name: ['', [Validators.required, Validators.pattern('[a-zA-Z ]*')]],
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
    confirmpassword: [
      '',
      [
        Validators.required,
        Validators.minLength(6),
        Validators.pattern(/.*[a-z].*/),
        Validators.pattern(/.*[A-Z].*/),
        Validators.pattern(/.*\d.*/),
      ],
    ],
    terms: [false, Validators.requiredTrue],
  });

  value: any;

  get name() {
    return this.registerForm.get('name');
  }

  get email() {
    return this.registerForm.get('email');
  }

  get password() {
    return this.registerForm.get('password');
  }

  get confirmpassword() {
    return this.registerForm.get('confirmpassword');
  }

  get terms() {
    return this.registerForm.get('terms');
  }

  onSubmit() {
    const signupService = new SignupService(this.http);
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    signupService.signup(this.registerForm.value,headers).subscribe({
      next: (data: any) => {
        if (data.ok) {
          const expiryTime = Date.now() + 24 * 60 * 60 * 1000;
          localStorage.setItem('token', data.body.token);
          localStorage.setItem('tokenExpiry', expiryTime.toString());
          this.router.navigate(['/verify']);
        } else {
          this.router.navigate(['/signup']);
          alert('Error, Something went wrong');
        }
      },
      error: (error: any) => {
        console.error('An error occurred:', error);
      },
    });
  }

  showTerms: boolean = false;

  showDialog() {
    this.showTerms = true;
  }

  hasLowercase() {
    return /[a-z]/.test(this.registerForm.get('password')?.value ?? '');
  }

  hasUppercase() {
    return /[A-Z]/.test(this.registerForm.get('password')?.value ?? '');
  }

  hasNumeric() {
    return /\d/.test(this.registerForm.get('password')?.value ?? '');
  }

  isMinLength() {
    const length: any = this.registerForm.get('password')?.value?.length ?? 0;
    return length >= 6;
  }
}
