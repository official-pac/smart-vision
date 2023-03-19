import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-receipt',
  templateUrl: './receipt.component.html',
  styleUrls: ['./receipt.component.css'],
  standalone: true,
  imports: [CommonModule]
})
export class ReceiptComponent implements OnInit {

  transactionId!: string;
  carRegistrationNumber!: string;
  transactionTime!: number;
  totalAmount!: number;
  constructor(private storageService: StorageService) { }

  ngOnInit(): void {
    this.initDetails();
  }

  private initDetails() {
    this.carRegistrationNumber = this.storageService.userDetails?.rcNumber;
    this.totalAmount = this.storageService.slotDetails?.charge;
    this.transactionId = `MH${Math.floor(Math.random() * 999)}`; // 5 digit with 2 alphabet
    this.transactionTime = this.storageService.transactionTime;
  }

}
