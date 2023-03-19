import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-parking-slot-selection',
  templateUrl: './parking-slot-selection.component.html',
  styleUrls: ['./parking-slot-selection.component.css'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule]
})
export class ParkingSlotSelectionComponent implements OnInit {

  charge = 0;
  duration!: FormControl;
  slot: number = 0;
  constructor(private storageService: StorageService, private router: Router) { }

  ngOnInit(): void {
    this.initField();
  }

  private initField(): void {
    this.duration = new FormControl(0, [Validators.required,
    Validators.pattern('[0-9]+$'), Validators.min(1), Validators.max(24)]);
  }

  onSlotClick(index: number): void {
    this.slot = index;
  }

  private calculateCharge(duration: number): number {
    try {
      let charge = 200;
      while (duration > 4) {
        if (duration > 12 && duration <= 24) {
          const difference = duration - 12;
          charge += difference * 25;
          duration -= difference;
        } else if (duration > 4 && duration <= 12) {
          const difference = duration - 4;
          charge += difference * 30;
          duration -= difference;
        }
      }
      return charge;
    } catch (error) { throw error; }
  }

  onDurationChange(): void {
    try {
      if (this.duration.invalid) return;
      const duration = this.duration.value;
      this.charge = this.calculateCharge(duration);
    } catch (error) { console.log('error: ', error); }
  }

  submit(): void {
    if (this.isInvalid) return;
    this.storageService.slotDetails = { charge: this.charge, duration: this.duration.value, spotNumber: this.slot };
    this.router.navigate(['payment']);
  }

  get isInvalid() {
    return this.duration.invalid || this.slot === 0
  }

}
