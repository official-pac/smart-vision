import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { Router } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css'],
  imports: [ReactiveFormsModule]
})
export class RegistrationComponent implements OnInit {

  form!: FormGroup;
  constructor(private fb: FormBuilder, private router: Router) { }

  ngOnInit(): void {
    this.initForm();
  }

  private initForm() {
    this.form = this.fb.group({
      ownerName: this.fb.control(''),
      emailId: this.fb.control(''),
      rcNumber: this.fb.control(''),
      carType: this.fb.control(''),
      plateType: this.fb.control(''),
      photo: this.fb.control(''),
      contact: this.fb.control(null)
    });
  }

  register() {
    console.log('Form: ', this.form.value);
    if (this.form.valid) {
      this.router.navigate(['car-details']);
    }
  }

}
