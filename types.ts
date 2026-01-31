import type {User} from "./context/AuthContext.tsx";

export interface RoomType {
    id:string;
    name:string,
    description:string,
    pricePerNight:number,
    detail:Detail,
    photos:RoomPhoto[]
}

export interface RoomPhoto {
    id:string;
    public_id:string
    uri:string,
}

export interface Detail {
    id:string,
    norishment:string[],
    spa:string[],
    view:string[]
    capacity:number,
    roomTypeId:string

}

export interface Room {
    id:string,
    number:number,
    RoomTypeId:string,
    type:RoomType
}

export interface Reservation {
    id:string,
    checkInDate:Date,
    checkOutDate:Date,
    user:User,
    room:Room,
    status:Status,
    TotalPrice:number

}

export enum userTabs {
    Reservations = "reservations",
    Info = "profile"

}


export enum Status {
    Active="Active",
    Past = "Canceled"
}


