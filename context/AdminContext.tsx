import {createContext, useState, useContext, useEffect, type ReactNode} from "react"
import {useNavigate} from "react-router";
import {useAuth, type User} from "./AuthContext";
import {type Reservation, type Room} from "../types";
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
    const navigate = useNavigate();
    const api_url = import.meta.env.VITE_API_URL
    const [guests,setGuests] = useState<User[]>([])
    const [workers, setWorkers] = useState<User[]>([])
    const [reservations, setReservations] = useState<Reservation[]>([])
    const [availableRooms,setAvailableRooms] = useState<number>(0)
    const [occupiedRooms, setOccupiedRooms] = useState<number>(0)
    const [rooms, setRooms] = useState<Room[]>([])
    const {roles} = useAuth();

    useEffect(() => {
        const controller = new AbortController();
        const fetch = async () =>{
            let isAdmin = false
            const token = Cookies.get("token")
            for(const role of roles){
                if(role==="ADMIN" || role==="OWNER"){
                    isAdmin = true;
                }
            }
            console.log(isAdmin)
            if(isAdmin && token!==null){
                try{
                    const [response,reservationResponse, roomResponse] = await Promise.all([
                        axios.get(api_url+"/report",{
                            headers: { Authorization: `Bearer ${token}` },
                            signal: controller.signal
                        }),
                        axios.get(api_url+"/reservation",{
                            headers:{Authorization:`Bearer ${token}`},
                            signal:controller.signal
                        }),
                        axios.get(api_url+"/room", {
                            headers:{Authorization:`Bearer ${token}`},
                            signal:controller.signal
                        })
                    ])
                    if(response.status==200){
                        const {guests, workers, availableRooms, occupiedRooms} = response.data.item
                        setGuests(guests)
                        setAvailableRooms(availableRooms)
                        setOccupiedRooms(occupiedRooms)
                        setWorkers(workers)
                    }
                    else{
                        console.error("Error occurred: "+response)
                    }
                    if(reservationResponse.status==200){
                        const {items} = reservationResponse.data
                        setReservations(items);
                    }
                    if(roomResponse.status==200){
                        const {items} = roomResponse.data
                        setRooms(items)
                    }

                }
                catch (error){
                    console.error("Error occurred "+error)
                }
            }
            else if(roles.length > 0){
                navigate("/authorize?type=login");
            }
        }
        fetch();

    }, [api_url, roles])



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