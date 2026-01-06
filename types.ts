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


