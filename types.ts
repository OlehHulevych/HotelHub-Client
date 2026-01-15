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
    Id:string,
    Number:number,
    RoomTypeId:string,
    type:RoomType
}

export interface Reservation {
    id:string,
    checkInDate:Date,
    checkOutDate:Date
    room:Room,
    status:Status,
    TotalPrice:number

}


export enum Status {
    Active="Active",
    Past = "Canceled"
}


