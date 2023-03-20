import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { timer, take, map, interval, takeUntil, takeWhile } from 'rxjs';
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
  secondsLeft!: number;
  constructor(private storageService: StorageService, private router: Router) { }

  ngOnInit(): void {
    this.initDetails();
    this.showTimer();
  }

  private initDetails() {
    this.carRegistrationNumber = this.storageService.userDetails?.rcNumber;
    this.totalAmount = this.storageService.slotDetails?.charge;
    this.transactionId = `MH${Math.floor(Math.random() * 999)}`;
    this.transactionTime = this.storageService.transactionTime;
  }

  showTimer() {
    const source = timer(0, 1000);
    source.pipe(takeWhile(val => val <= 6))
      .subscribe(val => val < 6 ? this.secondsLeft = 5 - val : this.router.navigate(['/']));
  }

}
