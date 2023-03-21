import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { StorageService } from 'src/app/services/storage.service';
import { TransactionDetails } from 'src/app/services/interface';
import { Router } from '@angular/router';
import { UpperCaseDirective } from 'src/app/directives/upper-case.directive';

@Component({
  selector: 'app-payment-card',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, UpperCaseDirective],
  templateUrl: './payment-card.component.html',
  styleUrls: ['./payment-card.component.css'],
})
export class PaymentCardComponent implements OnInit {

  form!: FormGroup;
  isProcessing!: boolean;
  payableAmount!: number;
  @Output() complete = new EventEmitter<TransactionDetails>();
  constructor(private fb: FormBuilder, private storageService: StorageService, private router: Router) { }

  ngOnInit(): void {
    this.initForm();
    this.isProcessing = false;
    this.payableAmount = this.storageService.slotDetails?.charge;
  }

  private initForm(): void {
    this.form = this.fb.group({
      cardNumber: ['', [Validators.required, Validators.minLength(16), Validators.maxLength(16),
      Validators.pattern('[0-9]+$')]],
      cardHolderName: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50),
      Validators.pattern('[a-zA-Z ]+$')]],
      yearOfExpiry: ['', [Validators.required, Validators.maxLength(2), Validators.minLength(2),
      Validators.pattern('[0-9]+$'), Validators.min(new Date().getFullYear() % 100)]],
      monthOfExpiry: ['', [Validators.required, Validators.maxLength(2), Validators.minLength(2),
      Validators.pattern('[0-9]+$'), Validators.min(new Date().getMonth() + 1), Validators.max]],
      cvv: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(3),
      Validators.pattern('[0-9]+$')]]
    });
  }

  makePayment(): void {
    try {
      if (this.form.invalid) return;
      this.isProcessing = true;
      setTimeout(() => {
        this.isProcessing = false;
        this.complete.next({
          dateAndTimeOfTransaction: Date.now(),
          status: 'SUCCESS',
          transactionId: `MH${Math.floor(Math.random() * 999)}`
        });
      }, 3000);
    } catch (error) { console.log(error); }
  }

}
