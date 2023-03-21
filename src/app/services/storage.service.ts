import { Injectable } from '@angular/core';
import { SlotDetails, TransactionDetails, UserDetails } from './interface';

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
    return data ? JSON.parse(data) : null;
  }

  set slotDetails(slotDetails: SlotDetails) {
    sessionStorage.setItem('slotDetails', JSON.stringify(slotDetails));
  }

  get slotDetails(): SlotDetails {
    const data = sessionStorage.getItem('slotDetails');
    return data ? JSON.parse(data) : null;
  }

  set transactionDetails(txnDetails: TransactionDetails) {
    sessionStorage.setItem('txnDetails', JSON.stringify(txnDetails));
  }

  get transactionDetails(): TransactionDetails {
    const txnDetails = sessionStorage.getItem('txnDetails');
    return txnDetails ? JSON.parse(txnDetails) : null;
  }

}
