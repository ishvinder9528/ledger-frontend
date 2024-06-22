import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import {
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AvatarModule } from 'primeng/avatar';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
@Component({
  selector: 'app-add-transaction',
  standalone: true,
  imports: [
    DialogModule,
    CommonModule,
    ButtonModule,
    AvatarModule,
    InputTextModule,
    DropdownModule,
    CalendarModule,
    InputTextareaModule,
    ReactiveFormsModule,
  ],
  templateUrl: './add-transaction.component.html',
  styleUrl: './add-transaction.component.css',
})
export class AddTransactionComponent {
  @Input() visible: boolean = false;
  @Input() customer: any = '';
  @Input() user: any = '';
  @Output() visibleChange = new EventEmitter<boolean>();
  @Output() addTransaction = new EventEmitter<any>();

  constructor(private http: HttpClient, private fb: FormBuilder) {}

  transactionForm = this.fb.group({
    type: ['', Validators.required],
    amount: ['', Validators.required],
    description: [''],
    date: [''],
  });

  get type() {
    return this.transactionForm.get('type');
  }

  get amount() {
    return this.transactionForm.get('amount');
  }

  get description() {
    return this.transactionForm.get('description');
  }

  get date() {
    return this.transactionForm.get('date');
  }

  typeOptions = [
    { name: 'Income'},
    { name: 'Expense' },
  ];

  hideDialog() {
    this.visible = false;
    this.visibleChange.emit(this.visible);
  }
  onSaveTransaction() {
    console.log(this.transactionForm.value);
    
    // this.addTransaction.emit(this.transactionForm.value);
    // this.hideDialog();
    // this.transactionForm.reset();
  }
}
