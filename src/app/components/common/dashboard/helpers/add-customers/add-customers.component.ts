import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AvatarModule } from 'primeng/avatar';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { Customer } from '../../../../../helpers/interfaces';
@Component({
  selector: 'app-add-customers',
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
  templateUrl: './add-customers.component.html',
  styleUrl: './add-customers.component.css',
})
export class AddCustomersComponent {
  @Input() visible: boolean = false;
  @Input() user: any;
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

  hideDialog() {
    this.visible = false;
    this.visibleChange.emit(this.visible);
  }

  onSaveCustomer() {
    this.saveCustomer.emit(this.customerForm.value as Customer );
    this.hideDialog();
  }
}
