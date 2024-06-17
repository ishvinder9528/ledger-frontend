import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class VerifyOtpService {
  constructor(private http: HttpClient) {}

  url: any = environment.apiUrl;

  verifyOtp(data: any, headers?: HttpHeaders): Observable<any> {
    return this.http.post(`${this.url}/auth/verify-otp`, data, { headers });
  }

  resendOtp(headers: HttpHeaders): Observable<any> {
    return this.http.get(`${this.url}/auth/resend-otp`, { headers });
  }
}
