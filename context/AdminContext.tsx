import {createContext, useState, useContext, useEffect, type ReactNode, type Dispatch, type SetStateAction} from "react"
import {useNavigate} from "react-router";
import {useAuth, type User} from "./AuthContext";
import {type ReservationAdmin, type Room, type RoomType} from "../types";
import axios from "axios";
import Cookies from "js-cookie";

interface lengthType {
    totalReservationLength?:number,
    activeReservationLength?:number,
    canceledReservationLength?:number,

}

interface roomLengthType{
    freeRoomLength?:number,
    occupiedRoomLength?:number,
    maintenanceRoomLength?:number,
    totalRoomLength?:number
}
interface contextProps {
    status:string|null,
    setStatus:Dispatch<SetStateAction<string|null>>
    reload:number,
    setReload:Dispatch<SetStateAction<number>>,
    guests:User[]
    staff:User[]
    roomTypes:RoomType[],
    pageStaff:number,
    setPageStaff:Dispatch<SetStateAction<number>>
    maxPageStaff:number
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
    reservations:ReservationAdmin[],
    rooms:Room[],
    roomLengths:roomLengthType,
    roomStatus:number|null,
    setRoomStatus:Dispatch<SetStateAction<number|null>>
}

export enum AdminTabs {
    Reservations = "reservations",
    Dashboard = "dashboard",
    Rooms = "rooms",
    RoomType = "roomType",
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
    const [roomLengths, setRoomLengths] = useState({
        totalRoomLength:0,
        freeRoomLength:0,
        occupiedRoomLength:0,
        maintenanceRoomLength:0
    })

    const [status, setStatus] = useState<string|null>(null)
    const [staff, setStaff] = useState<User[]>([])
    const [pageStaff, setPageStaff] = useState<number>(1)
    const [maxPageStaff,setMaxPageStaff ] = useState<number>(1)
    const [reload,setReload] = useState<number>(0)
    const api_url = import.meta.env.VITE_API_URL
    const [guests,setGuests] = useState<User[]>([])
    const [workers, setWorkers] = useState<User[]>([])
    const [roomPage,setRoomPage] = useState<number>(1)
    const [roomMaxPages, setRoomMaxPages] = useState<number>(1)
    const [reservationMaxPages, setReservationMaxPages] = useState<number>(1)
    const [reservations, setReservations] = useState<ReservationAdmin[]>([])
    const [availableRooms,setAvailableRooms] = useState<number>(0)
    const [occupiedRooms, setOccupiedRooms] = useState<number>(0)
    const [rooms, setRooms] = useState<Room[]>([])
    const [roomStatus, setRoomStatus] = useState<number|null>(null)
    const [reservationPage, setReservationPage] = useState<number>(1);
    const [tab,setTab] = useState<string>(AdminTabs.Reservations)
    const [roomTypes, setRoomTypes] = useState<RoomType[]>([])
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
                    const [response,reservationResponse, roomResponse, staffResponse, roomTypeResponse] = await Promise.all([
                        axios.get(api_url+"/report",{
                            headers: { Authorization: `Bearer ${token}` },
                            signal: controller.signal
                        }),
                        axios.get(api_url+`/reservation?currentPage=${reservationPage}&status=${status==null?"":status}`,{
                            headers:{Authorization:`Bearer ${token}`},
                            signal:controller.signal
                        }),
                        axios.get(api_url+`/room?currentPage=${roomPage}${roomStatus==null?"":`&roomStatus=${roomStatus}`}`, {
                            headers:{Authorization:`Bearer ${token}`},
                            signal:controller.signal
                        }),
                        axios.get(api_url + `/user/All?currentPage=${pageStaff}`,{
                            headers:{Authorization:`Bearer ${token}`},
                            signal:controller.signal
                        }),
                        axios.get(api_url + `/RoomType`,{
                            headers:{
                                Authorization:`Bearer ${token}`
                            },
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
                    if(reservationResponse.status==200){
                        const {items,totalPage,totalLength, activeLength, canceledLength} = reservationResponse.data
                        setLength({
                            totalReservationLength: totalLength,
                            activeReservationLength: activeLength,
                            canceledReservationLength: canceledLength
                        })
                        setReservations(items);
                        setReservationMaxPages(totalPage)

                    }
                    if(roomResponse.status==200){
                        const {items, totalPage, totalLength, occupiedLength, maintenanceLength, freeLength} = roomResponse.data
                        console.log(items)
                        setRooms(items)
                        setRoomMaxPages(totalPage)
                        setRoomLengths({
                            totalRoomLength: totalLength,
                            occupiedRoomLength: occupiedLength,
                            maintenanceRoomLength: maintenanceLength,
                            freeRoomLength: freeLength
                        })

                    }
                    if(staffResponse.status==200){
                        const {items, currentPage, totalPage} = staffResponse.data;
                        setStaff(items)
                        setPageStaff(currentPage)
                        setMaxPageStaff(totalPage)

                    }
                    if(roomTypeResponse.status==200){
                        const {items} = roomTypeResponse.data;
                        setRoomTypes(items);
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

    }, [api_url, roles ,reservationPage,roomPage, reload,status, roomStatus, pageStaff])



    return(
        <AdminContext.Provider value={{guests, availableRooms, occupiedRooms ,workers,reservations, rooms, tab,setTab,roomPage, setRoomPage, reservationPage, setReservationPage, reservationMaxPages, roomMaxPages, reload, setReload, lengths, setStatus, status, roomLengths,setRoomStatus, roomStatus, staff,maxPageStaff, setPageStaff, pageStaff, roomTypes  }}>
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