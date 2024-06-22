import { CommonModule } from '@angular/common';
import {
  HttpClient,
  HttpClientModule,
  HttpHeaders,
} from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { IconFieldModule } from 'primeng/iconfield';
import { TableModule } from 'primeng/table';
import { getToken } from '../../../../environments/environment';
import { TagModule } from 'primeng/tag';
import { TransactionService } from '../../../services/transaction/transaction.service';
import { AddTransactionComponent } from './helpers/add-transaction/add-transaction.component';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { RouterModule } from '@angular/router';
@Component({
  selector: 'app-transactions',
  standalone: true,
  imports: [
    CardModule,
    CommonModule,
    ButtonModule,
    TableModule,
    IconFieldModule,
    HttpClientModule,
    TagModule,
    AddTransactionComponent,
    BreadcrumbModule,
    RouterModule,
  ],
  templateUrl: './transactions.component.html',
  styleUrl: './transactions.component.css',
})
export class TransactionsComponent {
  constructor(private router: Router, private http: HttpClient) {
    const navigation = this.router.getCurrentNavigation();
    this.user = navigation?.extras.state?.['user'];
    this.id = navigation?.extras.state?.['id'];
    this.customer = navigation?.extras.state?.['data'];
  }

  user: any = '';
  id: any;
  customer: any;
  addTransactionVisible: boolean = false;
  transactions: any = [];
  headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'X-Token': this.getToken(),
  });
  transactionService: any = new TransactionService(this.http);
  ngOnInit() {
    this.getTransactions();
    console.log('tid:', this.id);
    console.log('tuser:', this.user);
    console.log('data:', this.customer);
  }

  getTransactions() {
    this.transactionService.getTransactions(this.id, this.headers).subscribe({
      next: (data: any) => {
        this.transactions = data.transactions;
      },
      error: (error: any) => {
        console.log('some error occured:', error);
      },
    });
  }
  creatTransaction(data: any) {
    this.transactionService
      .createTransactions(this.id, data, this.headers)
      .subscribe({
        next: (data: any) => {
          this.transactions = data.transactions;
          console.log('transactions:', this.transactions);
          this.getTransactions();
        },
        error: (error: any) => {
          console.log('some error occured:', error);
        },
      });
  }
  getToken() {
    return getToken();
  }
  showAddDialog() {
    // this.avatar_image = `https://avatar.iran.liara.run/public?username=${this.user._id}`;
    this.addTransactionVisible = true;
  }
  getSeverity(status: string) {
    switch (status) {
      case 'Income':
        return 'success';
      case 'Expense':
        return 'danger';
      default:
        return 'warning';
    }
  }
}
