import {createContext, useState, useContext, useEffect, type ReactNode, type Dispatch, type SetStateAction} from "react"
import {useNavigate} from "react-router";
import {useAuth, type User} from "./AuthContext";
import {type Reservation, type Room} from "../types";
import axios from "axios";
import Cookies from "js-cookie";

interface lengthType {
    totalReservationLength:number,
    activeReservationLength:number,
    canceledReservationLength:number
}
interface contextProps {
    status:string|null,
    setStatus:Dispatch<SetStateAction<string|null>>
    reload:number,
    setReload:Dispatch<SetStateAction<number>>,
    guests:User[],
    tab:string,
    lengths:lengthType,
    roomPage:number,
    setRoomPage:Dispatch<SetStateAction<number>>,
    reservationPage:number,
    setReservationPage:Dispatch<SetStateAction<number>>,
    setTab:Dispatch<SetStateAction<string>>,
    roomMaxPages:number,
    reservationMaxPages:number,
    availableRooms:number,
    occupiedRooms:number,
    workers:User[],
    reservations:Reservation[],
    rooms:Room[],
}

export enum AdminTabs {
    Reservations = "reservations",
    Dashboard = "dashboard",
    Rooms = "rooms",
    Guest = "guests",
    staff = "staff"

}

const AdminContext = createContext<contextProps|undefined>(undefined)

export const AdminLayout = ({children}:{children:ReactNode}) => {
    const navigate = useNavigate();
    const [lengths, setLength] = useState({
        totalReservationLength:0,
        activeReservationLength:0,
        canceledReservationLength:0
    })
    const [status, setStatus] = useState<string|null>(null)
    const [reload,setReload] = useState<number>(0)
    const api_url = import.meta.env.VITE_API_URL
    const [guests,setGuests] = useState<User[]>([])
    const [workers, setWorkers] = useState<User[]>([])
    const [roomPage,setRoomPage] = useState<number>(1)
    const [roomMaxPages, setRoomMaxPages] = useState<number>(1)
    const [reservationMaxPages, setReservationMaxPages] = useState<number>(1)
    const [reservations, setReservations] = useState<Reservation[]>([])
    const [availableRooms,setAvailableRooms] = useState<number>(0)
    const [occupiedRooms, setOccupiedRooms] = useState<number>(0)
    const [rooms, setRooms] = useState<Room[]>([])
    const [reservationPage, setReservationPage] = useState<number>(1);
    const [tab,setTab] = useState<string>(AdminTabs.Reservations)
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
                        axios.get(api_url+`/reservation?currentPage=${reservationPage}&status=${status==null?"":status}`,{
                            headers:{Authorization:`Bearer ${token}`},
                            signal:controller.signal
                        }),
                        axios.get(api_url+`/room?currentPage=${roomPage}`, {
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
                        const {items,totalPage,totalLength, activeLength, canceledLength} = reservationResponse.data
                        setLength({
                            totalReservationLength: totalLength,
                            activeReservationLength: activeLength,
                            canceledReservationLength: canceledLength
                        })
                        console.log(totalPage)
                        setReservations(items);
                        setReservationMaxPages(totalPage)

                    }
                    if(roomResponse.status==200){
                        const {items, totalPages} = roomResponse.data
                        setRooms(items)
                        setRoomMaxPages(totalPages)

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

    }, [api_url, roles ,reservationPage,roomPage, reload,status])



    return(
        <AdminContext.Provider value={{guests, availableRooms, occupiedRooms ,workers,reservations, rooms, tab,setTab,roomPage, setRoomPage, reservationPage, setReservationPage, reservationMaxPages, roomMaxPages, reload, setReload, lengths, setStatus, status}}>
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