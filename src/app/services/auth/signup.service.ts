import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SignupService {
  constructor(private http: HttpClient) {}

  url: string = 'https://ledger-backend-txzo.onrender.com';

  checkBackend(): Observable<any> {
    return this.http.get(`${this.url}/`);
  }
  
}
