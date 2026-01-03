export interface RoomType {
    id:string;
    name:string,
    description:string,
    pricePerNight:number,
    norishment:string[],
    view:string[]
    shower:string[]
    photos:RoomPhoto[]


}

export interface RoomPhoto {
    id:string;
    public_id:string
    uri:string,
}


