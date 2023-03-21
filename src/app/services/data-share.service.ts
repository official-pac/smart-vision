import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataShareService {

  private userDetailsSubject = new BehaviorSubject<any>(null);
  constructor() { }

  // setRegistrationNumber(number: string): void {
  //   sessionStorage.setItem('registrationNumber', number);
  // }

  // getRegistrationNumber(): string | null {
  //   return sessionStorage.getItem('registrationNumber') || null;
  // }

  set userDetails(userDetails: {}) {
    this.userDetailsSubject.next(userDetails);
  }

  get userDetails(): {} {
    return this.userDetailsSubject.value;
  }

}
