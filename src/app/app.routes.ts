import { Routes } from '@angular/router';
import { SignupComponent } from './components/auth/signup/signup.component';
import { HomeComponent } from './components/common/home/home.component';
import { PageNotFoundComponent } from './components/common/page-not-found/page-not-found.component';
import { LoginComponent } from './components/auth/login/login.component';
import { DashboardComponent } from './components/common/dashboard/dashboard.component';
import { OtpVerificationComponent } from './components/auth/otp-verification/otp-verification.component';
import { ProfileComponent } from './components/common/profile/profile.component';
import { TransactionsComponent } from './components/common/transactions/transactions.component';

export const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'login', component: LoginComponent },
  { path: 'verify', component: OtpVerificationComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'transaction', component: TransactionsComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent },
];
