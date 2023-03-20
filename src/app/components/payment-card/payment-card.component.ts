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
  imports: [CommonModule, ReactiveFormsModule, UpperCaseDirective ],
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
      cardNumber: ['', [Validators.required, Validators.minLength(16)]],
      cardHolderName: ['', [Validators.required, Validators.minLength(2)]],
      yearOfExpiry: ['', [Validators.required, Validators.maxLength(2), Validators.minLength(2)]],
      monthOfExpiry: ['', [Validators.required, Validators.maxLength(2), Validators.minLength(2)]],
      cvv: [null, [Validators.required, Validators.maxLength(3)]]
    });
  }

  makePayment() {
    try {
      if (this.form.invalid) return;
      this.isProcessing = true;
      setTimeout(() => {
        this.storageService.transactionTime = Date.now();
        this.router.navigate(['receipt']);
      }, 3000);
    } catch (error) { console.log(error); }
  }

}
