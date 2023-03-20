import { AfterViewInit, ChangeDetectorRef, Component, CUSTOM_ELEMENTS_SCHEMA, OnInit, TemplateRef, ViewChild, ViewContainerRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { StorageService } from 'src/app/services/storage.service';
import { Router } from '@angular/router';
import { PaymentCardComponent } from '../payment-card/payment-card.component';
import { TransactionDetails } from 'src/app/services/interface';
import { PaymentsCashComponent } from '../payments-cash/payments-cash.component';

@Component({
  selector: 'app-payments',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, PaymentCardComponent, PaymentsCashComponent],
  templateUrl: './payments.component.html',
  styleUrls: ['./payments.component.css'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PaymentsComponent implements OnInit, AfterViewInit {

  @ViewChild('container', { read: ViewContainerRef }) container !: ViewContainerRef;
  @ViewChild('cash') cashTemplate!: TemplateRef<any>;
  @ViewChild('card') cardTemplate!: TemplateRef<any>;
  
  paymentMode!: FormControl;
  constructor(private storageService: StorageService, private changeDetectorRef: ChangeDetectorRef,
    private router: Router) { }

  ngOnInit(): void {
    this.initControls();
  }

  ngAfterViewInit(): void {
    this.setMode();
  }

  private initControls(): void {
    this.paymentMode = new FormControl("2", [Validators.required]);
  }

  setMode(): void {
    this.container.clear();
    this.paymentMode.value === "1" ? this.container.createEmbeddedView(this.cashTemplate) : this.container.createEmbeddedView(this.cardTemplate);
    this.changeDetectorRef.detectChanges();
  }

  onPaymentComplete(txnDetails: TransactionDetails) {
    if (txnDetails?.status === 'SUCCESS') {
      this.storageService.transactionDetails = txnDetails;
      this.router.navigate(['receipt']);
    } else {
      // TODO: Route To Payment Failed Page
    }
  }

}
