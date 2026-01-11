import {createContext, Dispatch, ReactNode, SetStateAction, useContext, useEffect, useState} from "react";
import {Reservation} from "../types";
import Cookies from "js-cookie";
import axios from "axios";


interface contextProps {
    pastReservations:Reservation[],
    activeReservations:Reservation[],
    setTab:Dispatch<SetStateAction<string>>
    tab:string,
}


const UserContext = createContext<contextProps|undefined>(undefined);

export const UserLayout = ({children}:{children:ReactNode}) => {

    const [pastReservations, setPastReservations] = useState<Reservation[]|[]>([]);
    const [activeReservations, setActiveReservations] = useState<Reservation[]|[]>()
    const [tab, setTab]=useState<string>("info")
    const api_url = import.meta.env.VITE_API_URL

    useEffect(() => {

        const fetchReservatins = async () => {
            const token = Cookies.get("token")
            if(token==null){
                return
            }
            try{
                const response = await axios.get( api_url+ "/reservation/user",{
                    headers:{
                        Authorization:`Bearer ${token}`
                    }
                });
                if(response.status==200){
                    const {items} = response.data
                    setPastReservations(items.filter(item=>item.status==="canceled"));
                    setActiveReservations(items.filter(item=>item.status==="active"));
                }
            }
            catch (error){
                console.error("The error occurred: "+error)
            }
        }
        fetchReservatins();
    }, []);

    return (
        <UserContext.Provider value={{tab, setTab, activeReservations, pastReservations}}>
            {children}
        </UserContext.Provider>
    )
}

export const useInfo = ()=> {
    const context = useContext(UserContext)
    if(!context){
        throw new  Error("The useInfo can be used within UserLayout")
    }
    return context;
}
export default UserLayout