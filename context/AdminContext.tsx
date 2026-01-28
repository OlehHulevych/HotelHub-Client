import {createContext, useState, useContext, useEffect, type ReactNode} from "react"
import {useAuth, User} from "./AuthContext";
import {Reservation, Room} from "../types";
import axios from "axios";
import Cookies from "js-cookie";

interface contextProps {
   guests:User[],
   availableRooms:number,
   occupiedRooms:number,
   workers:User[],
   reservations:Reservation[],
   rooms:Room[],
}

const AdminContext = createContext<contextProps|undefined>(undefined)

export const AdminLayout = ({children}:{children:ReactNode}) => {
    const api_url = import.meta.env.VITE_API_URL
    const [guests,setGuests] = useState<User[]>([])
    const [workers, setWorkers] = useState<User[]>([])
    const [reservations, setReservations] = useState<Reservation[]>([])
    const [availableRooms,setAvailableRooms] = useState<number>(0)
    const [occupiedRooms, setOccupiedRooms] = useState<number>(0)
    const [rooms, setRooms] = useState<Room[]>([])
    const {roles} = useAuth();

    useEffect(() => {
        const fetch = async () =>{
            let isAdmin = false
            const token = Cookies.get("token")
            for(const role of roles){
                if(role=="ADMIN" || role=="OWNER"){
                    isAdmin = true;
                }
            }
            if(isAdmin && token!==null){
                try{
                    const response  = await axios.get(api_url+"/report",{
                        headers:{
                            "Content-Type":"application/json",
                            Authorization:"Bearer "+token
                        }
                    })
                    if(response.status==200){
                        const {guests, workers, availableRooms, occupiedRooms} = response.data.item
                        setGuests(guests)
                        setAvailableRooms(availableRooms)
                        setOccupiedRooms(occupiedRooms)
                        setWorkers(workers)
                    }
                }
                catch (error){
                    console.error("Error occurred "+error)
                }
            }
        }
        fetch();

    }, [api_url, roles]);

    return(
        <AdminContext.Provider value={{guests, availableRooms, occupiedRooms ,workers,reservations, rooms}}>
            {children}
        </AdminContext.Provider>
    )
}

export const useAdmin = () => {
    const context = useContext(AdminContext)
    if(!context){
        throw new Error("UseAdmin can be used within AdminLayout")
    }
    return context
}