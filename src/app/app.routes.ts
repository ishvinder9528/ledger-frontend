import { Routes } from '@angular/router';
import { SignupComponent } from './components/auth/signup/signup.component';
import { HomeComponent } from './components/auth/home/home.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { LoginComponent } from './components/auth/login/login.component';
import { DashboardComponent } from './components/common/dashboard/dashboard.component';
import { OtpVerificationComponent } from './components/auth/otp-verification/otp-verification.component';

export const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'login', component: LoginComponent },
  { path: 'verify', component: OtpVerificationComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent },
];
