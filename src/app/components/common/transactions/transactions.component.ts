import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { TableModule } from 'primeng/table';

@Component({
  selector: 'app-transactions',
  standalone: true,
  imports: [CardModule, CommonModule, ButtonModule, TableModule],
  templateUrl: './transactions.component.html',
  styleUrl: './transactions.component.css',
})
export class TransactionsComponent {
edit() {
throw new Error('Method not implemented.');
}
  user: any = '';
  id: any;
  data: any;
  constructor(private router: Router) {
    const navigation = this.router.getCurrentNavigation();
    this.user = navigation?.extras.state?.['user'];
    this.id = navigation?.extras.state?.['id'];
    this.data = navigation?.extras.state?.['data'];
  }

  ngOnInit() {
    console.log('tid:', this.id);
    console.log('tuser:', this.user);
    console.log('data:', this.data);
  }
}
