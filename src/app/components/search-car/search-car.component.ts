import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { KeyboardDirective } from 'src/app/directives/keyboard.directive';
import { UpperCaseDirective } from 'src/app/directives/upper-case.directive';
import { DataShareService } from 'src/app/services/data-share.service';
import { UserDetails } from 'src/app/services/interface';
import { StorageService } from 'src/app/services/storage.service';
import { KeyboardComponent } from '../keyboard/keyboard.component';

@Component({
  selector: 'app-search-car',
  templateUrl: './search-car.component.html',
  styleUrls: ['./search-car.component.css'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, UpperCaseDirective, RouterModule,
    KeyboardComponent, KeyboardDirective]
})
export class SearchCarComponent implements OnInit {

  registrationNumber!: FormControl;
  isCarNotFound = false;
  constructor(private router: Router, private storageService: StorageService, private dataShareService: DataShareService) { }

  ngOnInit(): void {
    this.initField();
    this.storageService.clearSessionStorage();
    this.seedStorage();
  }

  private initField() {
    this.registrationNumber = new FormControl('', [Validators.required, Validators.minLength(7),
    Validators.maxLength(15), Validators.pattern('[\\w]+$')]);
    this.isCarNotFound = false;
  }

  private async searchCar(): Promise<UserDetails | null> {
    try {
      this.isCarNotFound = false;
      const userDetailsFromDB = this.storageService.allUserDetails
        ?.find((ele: UserDetails) => ele.rcNumber === this.registrationNumber.value);
      return userDetailsFromDB ? userDetailsFromDB : null;
    } catch (error) { throw error; }
  }

  submit(): void {
    try {
      if (this.registrationNumber.valid) {
        this.searchCar()
          .then((val: UserDetails | null) => {
            if (val) {
              this.storageService.userDetails = val;
              this.router.navigate(['car-details']);
            } else { this.isCarNotFound = true; }
          });
      }
    } catch (error) { }
  }

  private seedStorage(): void {
    this.storageService.allUserDetails = [{
      ownerName: 'Arun', rcNumber: 'MH05EB1234', carType: 'SUV',
      plateType: 'General', emailId: 'arun.chandran@gmail.com', contact: 9876543210, photo: ''
    }]
  }

}
