import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class VerifyOtpService {

  constructor(private http:HttpClient) { }

  verifyOtp(data:any){
    return this.http.post('http://localhost:3000/auth/verify',data)
  }
}
