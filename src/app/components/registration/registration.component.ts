import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { firstValueFrom } from 'rxjs/internal/firstValueFrom';
import { UpperCaseDirective } from 'src/app/directives/upper-case.directive';
import { HttpService } from 'src/app/services/http.service';
import { CarType, PlateType, UserDetails } from 'src/app/services/interface';
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
  carTypes: Array<CarType> = [];
  plateTypes: Array<PlateType> = [];
  constructor(private fb: FormBuilder, private router: Router, private storageService: StorageService,
    private httpService: HttpService) { }

  ngOnInit(): void {
    this.initForm();
    this.initCarTypes();
    this.initPlateTypes();
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

  private async initCarTypes(): Promise<any> {
    try {
      const data: Array<CarType> = await firstValueFrom(this.httpService.get('/car-types'));
      this.carTypes = data;
      return data;
    } catch (error) { console.log('error: ', error); }
  }

  private async initPlateTypes(): Promise<any> {
    try {
      const data: Array<PlateType> = await firstValueFrom(this.httpService.get('/plate-types'));
      this.plateTypes = data;
      return data;
    } catch (error) { console.log('error: ', error); }
  }

}
