import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataShareService } from 'src/app/services/data-share.service';

@Component({
  selector: 'app-search-car',
  templateUrl: './search-car.component.html',
  styleUrls: ['./search-car.component.css'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule]
})
export class SearchCarComponent implements OnInit {

  // TODO: Add validators like should be alpha-numeric, min length, max length etc.
  registrationNumber!: FormControl;
  constructor(private router: Router, private dataShareService: DataShareService) { }

  ngOnInit(): void {
    this.initField();
    this.dataShareService.clearStorage();
  }

  private initField() {
    this.registrationNumber = new FormControl('', [Validators.required, Validators.minLength(7),
    Validators.maxLength(15), Validators.pattern('[\\w]+$')]);
  }

  search(): void {
    console.log('value: ', this.registrationNumber.value);
    if (this.registrationNumber.valid) {
      this.dataShareService.setRegistrationNumber(this.registrationNumber.value)
      this.router.navigate(['registration']);
    }
  }

}
