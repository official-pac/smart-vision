import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, ValidatorFn, Validators } from '@angular/forms';
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

  form: FormGroup = new FormGroup({});
  carTypes: Array<CarType> = [];
  plateTypes: Array<PlateType> = [];
  configuration?: { [key: string]: any };
  fields?: Array<any>;
  constructor(private fb: FormBuilder, private router: Router, private storageService: StorageService,
    private httpService: HttpService) { }

  ngOnInit(): void {
    this.loadUI();
  }

  private async loadUI(): Promise<any> {
    try {
      this.configuration = await firstValueFrom(this.httpService.get('/configuration', 'registration'));
      this.fields = this.configuration?.['fields'];
      this.initForm(this.configuration?.['fields']);
      this.initCarTypes();
      this.initPlateTypes();
    } catch (error) { console.log(error); }
  }

  private initForm(fields: Array<any>): void {
    try {
      const length = fields?.length;
      for (let i = 0; i < length; i++) {
        const field = fields[i];
        const validators: Array<ValidatorFn> = this.constructValidators(field.validations, field.fieldType);
        const control: FormControl = this.fb.control(field.initialValue, validators);
        this.form.addControl(field.fieldName, control);
      }
      this.form.updateValueAndValidity();
    } catch (error) { console.log(error); }
  }

  returnZero(): number { return 0; }

  private constructValidators(validations: { [key: string]: string }, fieldType: string): Array<ValidatorFn> {
    try {
      const validators = [];

      if (validations?.['isMandatory']) {
        validators.push(Validators.required);
      }
      if (validations?.['pattern']) {
        validators.push(Validators.pattern(validations?.['pattern']));
      }
      if (validations?.['minLength']) {
        validators.push(Validators.minLength(Number(validations['minLength'])));
      }
      if (validations?.['maxLength']) {
        validators.push(Validators.maxLength(Number(validations['maxLength'])));
      }
      if (fieldType === 'email') {
        validators.push(Validators.email);
      }
      return validators;
    } catch (error) { throw error; }
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
