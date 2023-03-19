import { AfterViewInit, ChangeDetectorRef, Component, OnInit, TemplateRef, ViewChild, ViewContainerRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { StorageService } from 'src/app/services/storage.service';
import { Router } from '@angular/router';
import { DataShareService } from 'src/app/services/data-share.service';

@Component({
  selector: 'app-payments',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './payments.component.html',
  styleUrls: ['./payments.component.css']
})
export class PaymentsComponent implements OnInit, AfterViewInit {

  @ViewChild('container', { read: ViewContainerRef }) container !: ViewContainerRef;
  @ViewChild('cash') cashTemplate!: TemplateRef<any>;
  @ViewChild('card') cardTemplate!: TemplateRef<any>;
  amount!: FormControl;
  paymentMode!: FormControl;
  isProcessing = false;
  constructor(private storageService: StorageService, private changeDetectorRef: ChangeDetectorRef,
    private router: Router, private dataShareService: DataShareService) { }

  ngOnInit(): void {
    this.initControls();
  }

  ngAfterViewInit(): void {
    this.setMode(1);
  }

  private initControls(): void {
    this.amount = new FormControl({ value: this.storageService.slotDetails?.charge, disabled: true }, Validators.required);
    this.paymentMode = new FormControl('1', [Validators.required]);
  }

  setMode(modeId: number): void {
    this.container.clear();
    modeId === 1 ? this.container.createEmbeddedView(this.cashTemplate) : this.container.createEmbeddedView(this.cardTemplate);
    this.changeDetectorRef.detectChanges();
  }

  pay(): void {
    this.isProcessing = true;
    setTimeout(() => {
      this.storageService.transactionTime = Date.now();
      this.router.navigate(['receipt']);
    }, 3000);
  }

}
