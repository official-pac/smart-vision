import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataShareService {

  constructor() { }

  setRegistrationNumber(number: string): void {
    sessionStorage.setItem('registrationNumber', number);
  }

  getRegistrationNumber(): string | null {
    return sessionStorage.getItem('registrationNumber') || null;
  }

  clearStorage() {
    sessionStorage.clear();
  }
}
