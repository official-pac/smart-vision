import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { ElementFocus } from './interface';

@Injectable({
  providedIn: 'root'
})
export class DataShareService {

  private userDetailsSubject = new BehaviorSubject<any>(null);
  private focusedElementSubject = new Subject<ElementFocus>();
  focusedElement$ = this.focusedElementSubject.asObservable();

  private keyPressSubjetct = new Subject<string | number>();
  keyPressSubjetct$ = this.keyPressSubjetct.asObservable();
  constructor() { }

  setFocusedElement(ele: ElementFocus): void {
    this.focusedElementSubject.next(ele);
  }

  setKeyPressedValue(val: string | number): void {
    this.keyPressSubjetct.next(val);
  }

  set userDetails(userDetails: {}) {
    this.userDetailsSubject.next(userDetails);
  }

  get userDetails(): {} {
    return this.userDetailsSubject.value;
  }

}

export const SLOTS_ROW_ONE = [
  { slotIndex: 1, slotNumber: 1, bookingStatus: 'BOOKED', bookingStatusCode: 0 },
  { slotIndex: 2, slotNumber: 2, bookingStatus: 'AVAILABLE', bookingStatusCode: 1 },
  { slotIndex: 3, slotNumber: 3, bookingStatus: 'AVAILABLE', bookingStatusCode: 1 },
  { slotIndex: 4, slotNumber: 4, bookingStatus: 'AVAILABLE', bookingStatusCode: 1 },
  { slotIndex: 5, slotNumber: 5, bookingStatus: 'AVAILABLE', bookingStatusCode: 1 },
  { slotIndex: 6, slotNumber: 6, bookingStatus: 'AVAILABLE', bookingStatusCode: 1 },
  { slotIndex: 7, slotNumber: 7, bookingStatus: 'AVAILABLE', bookingStatusCode: 1 },
  { slotIndex: 8, slotNumber: 8, bookingStatus: 'BOOKED', bookingStatusCode: 0 },
  { slotIndex: 9, slotNumber: 9, bookingStatus: 'AVAILABLE', bookingStatusCode: 1 },
  { slotIndex: 10, slotNumber: 10, bookingStatus: 'AVAILABLE', bookingStatusCode: 1 },
];

export const SLOTS_ROW_TWO = [
  { slotIndex: 11, slotNumber: 11, bookingStatus: 'BOOKED', bookingStatusCode: 0 },
  { slotIndex: 12, slotNumber: 12, bookingStatus: 'AVAILABLE', bookingStatusCode: 1 },
  { slotIndex: 13, slotNumber: 13, bookingStatus: 'BOOKED', bookingStatusCode: 0 },
  { slotIndex: 14, slotNumber: 14, bookingStatus: 'BOOKED', bookingStatusCode: 0 },
  { slotIndex: 15, slotNumber: 15, bookingStatus: 'BOOKED', bookingStatusCode: 0 },
  { slotIndex: 16, slotNumber: 16, bookingStatus: 'BOOKED', bookingStatusCode: 0 },
  { slotIndex: 17, slotNumber: 17, bookingStatus: 'AVAILABLE', bookingStatusCode: 1 },
  { slotIndex: 18, slotNumber: 18, bookingStatus: 'BOOKED', bookingStatusCode: 0 },
  { slotIndex: 19, slotNumber: 19, bookingStatus: 'AVAILABLE', bookingStatusCode: 1 },
  { slotIndex: 20, slotNumber: 20, bookingStatus: 'BOOKED', bookingStatusCode: 0 },
];
