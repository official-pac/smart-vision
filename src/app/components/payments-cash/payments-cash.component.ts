import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { StorageService } from 'src/app/services/storage.service';
import { TransactionDetails } from 'src/app/services/interface';

@Component({
  selector: 'app-payments-cash',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './payments-cash.component.html',
  styleUrls: ['./payments-cash.component.css']
})
export class PaymentsCashComponent implements OnInit {

  amount!: FormControl;
  isProcessing = false;
  @Output() complete = new EventEmitter<TransactionDetails>();
  constructor(private storageService: StorageService) { }

  ngOnInit(): void {
    this.initControls();
  }

  private initControls(): void {
    this.amount = new FormControl({ value: this.storageService.slotDetails?.charge, disabled: true }, Validators.required);
  }

  makePayment(): void {
    try {
      if (this.amount.invalid) return;
      this.isProcessing = true;
      setTimeout(() => {
        this.isProcessing = false;
        this.complete.next({
          dateAndTimeOfTransaction: Date.now(),
          status: 'SUCCESS',
          transactionId: `MH${Math.floor(Math.random() * 999)}`
        });
      }, 3000);
    } catch (error) {}
  }

}
