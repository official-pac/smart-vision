import { AfterViewInit, Component, OnInit, TemplateRef, ViewChild, ViewContainerRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { StorageService } from 'src/app/services/storage.service';

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
  flag = false;
  amount!: FormControl;
  cashAmount !: FormControl;
  constructor(private storageService: StorageService) { }

  ngOnInit(): void {
    this.amount = new FormControl({ value: this.storageService.slotDetails?.charge, disabled: true }, Validators.required);
    this.cashAmount = new FormControl(0, [Validators.required, Validators.min(100)]);
  }

  ngAfterViewInit(): void {
    this.setMode(this.flag);
  }

  toggle(): void {
    this.flag = !this.flag;
    this.setMode(this.flag);
  }

  setMode(flag: boolean) {
    this.container.clear();
    flag ? this.container.createEmbeddedView(this.cardTemplate) : this.container.createEmbeddedView(this.cashTemplate);
  }

}
