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
  styleUrls: ['./edit-customers.component.css'],
})
export class EditCustomersComponent implements OnInit, OnChanges {
  @Input() visible: boolean = false;
  @Input() customer: any = '';
  @Input() user: any = '';
  @Input() avatar_image: string = '';
  @Output() visibleChange = new EventEmitter<boolean>();
  @Output() editCustomer = new EventEmitter<any>();
  loading: boolean = true;

  constructor(private fb: FormBuilder) {}

  customerForm = this.createCustomerForm();

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
    this.patchFormValues();
    this.disableFormControls(true);
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['user']) {
    }
    if (changes['customer']) {
      this.loading = false;
      this.patchFormValues();
      this.disableFormControls(false);
    }
  }

  createCustomerForm() {
    return this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.email]],
      phone_no: [''],
      gst_no: [''],
    });
  }

  patchFormValues() {
    if (this.customer) {
      this.customerForm.patchValue(this.customer);
    }
  }

  hideDialog() {
    this.visible = false;
    this.loading = true;
    this.visibleChange.emit(this.visible);
    this.customerForm.reset(); // Reset the form
    this.customer = '';
    this.disableFormControls(true);
  }

  disableFormControls(disable: boolean) {
    if (disable) {
      this.customerForm.disable();
    } else {
      this.customerForm.enable();
    }
  }

  onEditCustomer() {
    this.editCustomer.emit(this.customerForm.value);
    this.hideDialog();
    this.disableFormControls(true);
    this.customerForm.reset();
  }
}
