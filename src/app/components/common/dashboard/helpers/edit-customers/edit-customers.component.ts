import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import {
  FormsModule,
  ReactiveFormsModule,
  FormBuilder,
  Validators,
} from '@angular/forms';
import { AvatarModule } from 'primeng/avatar';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'app-edit-customers',
  standalone: true,
  imports: [
    CommonModule,
    ButtonModule,
    DialogModule,
    AvatarModule,
    FormsModule,
    ReactiveFormsModule,
    InputTextModule,
  ],
  templateUrl: './edit-customers.component.html',
  styleUrl: './edit-customers.component.css',
})
export class EditCustomersComponent implements OnInit, OnChanges {
  @Input() visible: boolean = false;
  @Input() customer: any = '';
  @Input() user: any = '';
  @Input() avatar_image: string = '';
  @Output() visibleChange = new EventEmitter<boolean>();
  @Output() saveCustomer = new EventEmitter<any>();

  constructor(private fb: FormBuilder) {}

  customerForm = this.fb.group({
    name: ['', [Validators.required]],
    email: ['', [Validators.email]],
    phone_no: [''],
    gst_no: [''],
  });

  get name() {
    return this.customerForm.get('name');
  }
  get email() {
    return this.customerForm.get('email');
  }

  get phone_no() {
    return this.customerForm.get('phone_no');
  }

  get gst_no() {
    return this.customerForm.get('gst_no');
  }

  ngOnInit() {
    console.log('user:', this.user);
    console.log('customer:', this.customer);
    this.patchFormValues();
  }

  patchFormValues() {
    if (this.customer) {
      this.customerForm.patchValue(this.customer);
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['user']) {
      console.log('ngOnChanges - user:', this.user);
    }
    if (changes['customer']) {
      console.log('ngOnChanges - customer:', this.customer);
      this.customerForm = this.fb.group({
        name: [this.customer.name, [Validators.required]],
        email: [this.customer.email, [Validators.email]],
        phone_no: [this.customer.phone_no],
        gst_no: [this.customer.gst_no],
      });
    }
  }
  hideDialog() {
    this.visible = false;
    this.visibleChange.emit(this.visible);
  }

  onSaveCustomer() {
    this.saveCustomer.emit(this.customerForm.value);
    this.hideDialog();
  }
}
