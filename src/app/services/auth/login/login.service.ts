import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(private http: HttpClient) {}

  url: any = environment.apiUrl;

  login(data: any, headers: HttpHeaders): Observable<any> {
    return this.http.post<any>(`${this.url}/auth/login`, data, {
      headers,
      observe: 'response',
      withCredentials: true,
    });
  }
}
