import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CustomerService {
  constructor(private http: HttpClient) {}

  url: string = environment.apiUrl;

  getCustomer(headers: HttpHeaders): Observable<any> {
    return this.http.get<any>(`${this.url}/customer/customer`, {
      headers,
      withCredentials: true,
    });
  }
  getCustomerById(id: any, headers: HttpHeaders): Observable<any> {
    return this.http.get<any>(`${this.url}/customer/customer?id=${id}`, {
      headers,
      withCredentials: true,
    });
  }

  createCustomer(data: any, headers: HttpHeaders): Observable<any> {
    return this.http.post<any>(`${this.url}/customer/create`, data, {
      headers,
      withCredentials: true,
    });
  }

  editCustomer(id: any, data: any, headers: HttpHeaders): Observable<any> {
    return this.http.put<any>(`${this.url}/customer/modify/${id}`, data, {
      headers,
      withCredentials: true,
    });
  }
}
