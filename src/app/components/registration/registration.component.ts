import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UpperCaseDirective } from 'src/app/directives/upper-case.directive';
import { UserDetails } from 'src/app/services/interface';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  standalone: true,
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css'],
  imports: [ReactiveFormsModule, CommonModule, UpperCaseDirective]
})
export class RegistrationComponent implements OnInit {

  form!: FormGroup;
  constructor(private fb: FormBuilder, private router: Router, private storageService: StorageService) { }

  ngOnInit(): void {
    this.initForm();
  }

  private initForm() {
    this.form = this.fb.group({
      ownerName: this.fb.control('', [Validators.required]),
      emailId: this.fb.control('', [Validators.required]),
      rcNumber: this.fb.control('', [Validators.required]),
      carType: this.fb.control('', [Validators.required]),
      plateType: this.fb.control('', [Validators.required]),
      photo: this.fb.control(''),
      contact: this.fb.control(null)
    });
  }

  private async register(userDetails: UserDetails): Promise<any> {
    try {
      const savedUserDetails: Array<UserDetails> = this.storageService.allUserDetails;
      savedUserDetails.push(userDetails);
      this.storageService.allUserDetails = savedUserDetails;
      return true;
    } catch (error) { throw error; }
  }

  submit() {
    console.log('Form: ', this.form.value);
    if (this.form.valid) {
      this.register(this.form.value)
        .then(() => this.router.navigate(['slots']))
        .catch(error => console.log('error: ', error));
    } else { }
  }

}
