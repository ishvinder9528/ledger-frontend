import { HttpClient, HttpHeaders } from '@angular/common/http';
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

  signup(data: any, headers?: HttpHeaders): Observable<any> {
    return this.http.post<any>(`${this.url}/auth/create`, data, {
      headers,
      observe: 'response',
      withCredentials: true,
    });
  }

  logout(): Observable<any> {
    return this.http.get(`${this.url}/auth/logout`);
  }
}
