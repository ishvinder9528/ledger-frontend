import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  constructor(private http: HttpClient) {}

  url: any = environment.apiUrl;

  getUser(headers: HttpHeaders):Observable<any> {
    return this.http.get<any>(`${this.url}/auth/get-user`, {
      headers,
      withCredentials: true,
    });
  }

}
