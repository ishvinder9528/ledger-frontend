import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
@Injectable({
  providedIn: 'root',
})
export class SignupService {
  constructor(private http: HttpClient) {}

  url: string = environment.apiUrl;

  checkBackend(): Observable<any> {
    return this.http.get(`${this.url}/`);
  }

  signup(data: any): Observable<any> {
    return this.http.post(`${this.url}/auth/create`,data);
  }

  logout(): Observable<any> {
    return this.http.get(`${this.url}/auth/logout`);
  }
}
