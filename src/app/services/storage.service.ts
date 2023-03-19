import { Injectable } from '@angular/core';
import { SlotDetails, UserDetails } from './interface';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  // TODO: Make dynamic function to have only single function parameterised
  constructor() { }

  clearSessionStorage() {
    sessionStorage.clear();
  }

  set allUserDetails(userDetails: Array<UserDetails>) {
    sessionStorage.setItem('allUserDetails', JSON.stringify(userDetails));
  }

  get allUserDetails(): Array<UserDetails> {
    const data = sessionStorage.getItem('allUserDetails');
    return data ? JSON.parse(data) : [];
  }

  set userDetails(userDetails: UserDetails) {
    sessionStorage.setItem('userDetails', JSON.stringify(userDetails));
  }

  get userDetails(): UserDetails {
    const data = sessionStorage.getItem('userDetails');
    return data ? JSON.parse(data) : [];
  }

  set slotDetails(slotDetails: SlotDetails) {
    sessionStorage.setItem('slotDetails', JSON.stringify(slotDetails));
  }

  get slotDetails(): SlotDetails {
    const data = sessionStorage.getItem('slotDetails');
    return data ? JSON.parse(data) : null;
  }

  set transactionTime(time: number) {
    sessionStorage.setItem('transactionTime', String(time));
  }

  get transactionTime(): number {
    const time = sessionStorage.getItem('transactionTime');
    return time ? Number(time) : 0;
  }

}
