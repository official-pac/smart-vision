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