import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { UpperCaseDirective } from 'src/app/directives/upper-case.directive';
import { UserDetails } from 'src/app/services/interface';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  standalone: true,
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css'],
  imports: [ReactiveFormsModule, CommonModule, UpperCaseDirective, RouterModule]
})
export class RegistrationComponent implements OnInit {

  form!: FormGroup;
  carTypes: Array<{ type: string, displayName: string }> = [
    { type: 'SUV', displayName: 'SUV' },
    { type: 'SEDAN', displayName: 'Sedan' },
    { type: 'HATCHBACK', displayName: 'Hatchback' },
  ];
  plateTypes: Array<{ type: string, displayName: string }> = [
    { type: 'PUBLIC', displayName: 'Public' },
    { type: 'PRIVATE', displayName: 'Private' },
    { type: 'GOVERNMENT', displayName: 'Government' },
    { type: 'TAXI', displayName: 'Taxi' },
  ];
  constructor(private fb: FormBuilder, private router: Router, private storageService: StorageService) { }

  ngOnInit(): void {
    this.initForm();
  }

  private initForm() {
    this.form = this.fb.group({
      ownerName: this.fb.control('', [Validators.required, Validators.pattern('[a-zA-Z ]+$'),
      Validators.minLength(2), Validators.maxLength(25)]),
      emailId: this.fb.control('', [Validators.required, Validators.email]),
      rcNumber: this.fb.control('', [Validators.required, Validators.pattern('[\\w]+$'),
      Validators.minLength(8), Validators.maxLength(12)]),
      carType: this.fb.control('', [Validators.required]),
      plateType: this.fb.control('', [Validators.required]),
      // photo: this.fb.control(''),
      contact: this.fb.control('', [Validators.pattern('[0-9]+$'), Validators.minLength(10), Validators.maxLength(10)])
    });
  }

  private async register(userDetails: UserDetails): Promise<any> {
    try {
      const savedUserDetails: Array<UserDetails> = this.storageService.allUserDetails;
      savedUserDetails.push(userDetails);
      this.storageService.allUserDetails = savedUserDetails;
      this.storageService.userDetails = userDetails;
      return true;
    } catch (error) { throw error; }
  }

  submit() {
    if (this.form.valid) {
      this.register(this.form.value)
        .then(() => this.router.navigate(['slots']))
        .catch(error => console.log('error: ', error));
    } else { console.log('invalid form', this.form.errors); }
  }

}
