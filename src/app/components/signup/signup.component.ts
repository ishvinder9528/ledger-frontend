import { Component } from '@angular/core';
import { FormBuilder, FormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
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
  ],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css',
})
export class SignupComponent {
  
  registerForm = this.fb.group({
    name: ['', [Validators.required, Validators.pattern('[a-zA-Z ]*')]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    confirmpassword: ['', [Validators.required, Validators.minLength(6)]],
  });

value:any

  constructor(private fb: FormBuilder) {}

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

  onSubmit() {
    console.log(this.registerForm.value);
  }

  showTerms:boolean=false

  showDialog() {
    this.showTerms = true;
}
}
