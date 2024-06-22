import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class TransactionService {
  constructor(private http: HttpClient) {}

  url: string = environment.apiUrl;

  getTransactions(id: any, headers: HttpHeaders) {
    return this.http.get<any>(`${this.url}/trans/get/${id}`, {
      headers,
      withCredentials: true,
    });
  }
}
