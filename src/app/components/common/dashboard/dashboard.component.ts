import {
  HttpClient,
  HttpClientModule,
  HttpHeaders,
} from '@angular/common/http';
import { Component, ViewChild } from '@angular/core';
import { CardModule } from 'primeng/card';
import { DashboardService } from '../../../services/common/dashboad/dashboard.service';
import { getToken } from '../../../../environments/environment';
import { Table, TableModule } from 'primeng/table';
import { CommonModule } from '@angular/common';
import { SkeletonModule } from 'primeng/skeleton';
import { DataViewModule } from 'primeng/dataview';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { AvatarModule } from 'primeng/avatar';
import { ProfileService } from '../../../services/common/profile/profile.service';
import { AddCustomersComponent } from './helpers/add-customers/add-customers.component';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validator,
  Validators,
} from '@angular/forms';
import { CustomerService } from '../../../services/customer/customer.service';
import { TooltipModule } from 'primeng/tooltip';
import { EditCustomersComponent } from './helpers/edit-customers/edit-customers.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    AddCustomersComponent,
    EditCustomersComponent,
    CardModule,
    HttpClientModule,
    TableModule,
    CommonModule,
    SkeletonModule,
    DataViewModule,
    ButtonModule,
    DialogModule,
    InputTextModule,
    AvatarModule,
    FormsModule,
    ReactiveFormsModule,
    TooltipModule,
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent {
  constructor(private http: HttpClient, private fb: FormBuilder) {}
  @ViewChild('customer') customerTable: Table | undefined;

  debit: number = 0;
  income: number = 0;
  searchValue: string = '';
  products: any;
  layout: 'list' | 'grid' = 'list';
  customers: any | null = null;
  customer_id: any = '';
  customer_data: any = '';
  user: any;
  initialValue: any;
  addVisible: boolean = false;
  editVisible: boolean = false;
  dashboardService: any = new DashboardService(this.http);
  userService: any = new ProfileService(this.http);
  customerService: any = new CustomerService(this.http);
  headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'X-Token': this.getToken(),
  });
  avatar_image: string = '';

  ngOnInit() {
    this.getCustomer();
    this.getUser();
  }
  customerForm = this.fb.group({
    name: ['', [Validators.required]],
    email: ['', [Validators.email]],
    phone: [''],
    gst: [''],
  });

  get name() {
    return this.customerForm.get('name');
  }
  get email() {
    return this.customerForm.get('email');
  }

  get phone() {
    return this.customerForm.get('phone');
  }

  get gst() {
    return this.customerForm.get('gst');
  }
  getCustomer() {
    this.customerService.getCustomer(this.headers).subscribe({
      next: (data: any) => {
        console.log('Customers:', data);
        this.customers = data.customer;
      },
      error: (error: any) => {
        console.log('some error occured:', error);
      },
    });
  }
  getCustomerById() {
    this.customerService
      .getCustomerById(this.customer_id, this.headers)
      .subscribe({
        next: (data: any) => {
          this.customer_data = data.customer;
          console.log('Customer:', this.customer_data);
        },
        error: (error: any) => {
          console.log('some error occured:', error);
        },
      });
  }
  saveCustomer(customerdData: any) {
    this.customerService.createCustomer(customerdData, this.headers).subscribe({
      next: (data: any) => {
        console.log('data', data);
        this.getCustomer();
      },
      error: (error: any) => {
        console.log('some error occured:', error);
      },
    });
  }

  getUser() {
    this.userService.getUser(this.headers).subscribe({
      next: (data: any) => {
        console.log('data', data);
        this.user = data.user;
        console.log('this.user:', this.user);
      },
      error: (error: any) => {
        console.log('some error occured:', error);
      },
    });
  }
  showAddDialog() {
    this.avatar_image = `https://avatar.iran.liara.run/public?username=${this.user._id}`;
    this.addVisible = true;
  }
  showEditDialog(user: any) {
    this.avatar_image = `https://avatar.iran.liara.run/public?username=${this.user._id}`;
    this.editVisible = true;
    this.customer_id = user._id;
    this.getCustomerById();
  }
  onSearch(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    this.customerTable?.filterGlobal(inputElement.value, 'contains');
  }
  hideDialog() {
    this.editVisible = false;
  }

  counterArray(n: number): any[] {
    return Array(n);
  }

  getToken() {
    return getToken();
  }
}
