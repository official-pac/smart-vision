import { NgControl } from "@angular/forms";

export interface UserDetails {
    ownerName: string;
    emailId: string;
    rcNumber: string;
    carType: string;
    plateType: string;
    photo: string;
    contact: number
}

export interface SlotDetails {
    spotNumber: number;
    duration: number;
    charge: number;
}

export interface TransactionDetails {
    status: string,
    transactionId: string,
    dateAndTimeOfTransaction: number
}

export interface SlotInfo {
    slotIndex: number;
    slotNumber: number;
    bookingStatus: string;
    bookingStatusCode: number;
}

export interface CarType {
    type: string;
    displayName: string
}

export interface PlateType {
    type: string;
    displayName: string
}

export interface ElementFocus {
    elementRef: HTMLInputElement;
    control: NgControl
}