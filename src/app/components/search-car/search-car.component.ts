import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UpperCaseDirective } from 'src/app/directives/upper-case.directive';
import { HttpService } from 'src/app/services/http.service';
import { UserDetails } from 'src/app/services/interface';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-search-car',
  templateUrl: './search-car.component.html',
  styleUrls: ['./search-car.component.css'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, UpperCaseDirective]
})
export class SearchCarComponent implements OnInit {

  // TODO: Add validators like should be alpha-numeric, min length, max length etc.
  registrationNumber!: FormControl;
  constructor(private router: Router, private storageService: StorageService, private httpService: HttpService) { }

  ngOnInit(): void {
    this.initField();
    this.storageService.clearSessionStorage();
    this.seedStorage();
  }

  private initField() {
    this.registrationNumber = new FormControl('', [Validators.required, Validators.minLength(7),
    Validators.maxLength(15), Validators.pattern('[\\w]+$')]);
  }

  private async searchCar(): Promise<UserDetails | null> {
    try {
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
            } else { this.router.navigate(['registration']); }
          });
      }
    } catch (error) { }
  }

  private seedStorage(): void {
    this.storageService.allUserDetails = [{
      ownerName: 'Arun', rcNumber: 'MH05EB7542', carType: 'SUV',
      plateType: 'General', emailId: 'arun.chandran@gmail.com', contact: 9876543210, photo: ''
    }]
  }

}
