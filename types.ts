
export interface RoomType {
    id:string,
    name:string,
    pricePerNight:number,
    description:string,
    norishment:string[],
    photos:string[]
    spa:string[],
    view:string[],
    capacity:string[]
}

export interface Room {
    id:string,
    name:string,
    capacity:string,
    number:number,
    pricePerNight:number,
    type:string,
    status:number,
    photo:string
}

export interface Reservation {
    id:string,
    status:string;
    photos:string;
    totalPrice:string;
    typeName:string;
    checkInDate:Date;
    checkOutDate:Date;

}

export interface ReservationAdmin {
    id:string;
    number:number;
    guestName:string;
    status:string;
    checkInDate:Date;
    checkOutDate:Date;

}

export enum userTabs {
    Reservations = "reservations",
    Info = "profile"

}


export enum Status {
    Active="Active",
    Past = "Canceled"
}


