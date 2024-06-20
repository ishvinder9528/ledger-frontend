import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  constructor(private http: HttpClient) {}

  url: string = environment.apiUrl;

  getCustomer(headers: HttpHeaders): Observable<any> {
    return this.http.get<any>(`${this.url}/customer/customer`, {
      headers,
      withCredentials: true,
    });
  }
}
