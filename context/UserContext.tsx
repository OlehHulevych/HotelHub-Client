import {
    createContext,
    type Dispatch,
    type ReactNode,
    type SetStateAction,
    useContext,
    useEffect,
    useState
} from "react";
import {type Reservation, Status} from "../types";
import Cookies from "js-cookie";
import axios from "axios";


interface contextProps {
    edited:boolean,
    setEdited:Dispatch<SetStateAction<boolean>>,
    pastReservations:Reservation[]|undefined,
    activeReservations:Reservation[]|undefined,
    setTab:Dispatch<SetStateAction<string>>
    tab:string,
}


const UserContext = createContext<contextProps|undefined>(undefined);

export const UserLayout = ({children}:{children:ReactNode}) => {
    const [edited,setEdited] = useState<boolean>(false);
    const [pastReservations, setPastReservations] = useState([]);
    const [activeReservations, setActiveReservations] = useState([])
    const [tab, setTab]=useState<string>("reservations")
    const api_url = import.meta.env.VITE_API_URL

    useEffect(() => {
        const fetchReservatins = async () => {
            const token = Cookies.get("token")
            if(token==null){
                return;
            }
            try{
                const response = await axios.get( api_url+ "/reservation/user",{
                    headers:{
                        Authorization:`Bearer ${token}`
                    }
                });
                if(response.status==200){
                    const fetchedData = response.data.items; // Capture data in a variable

                    setPastReservations(fetchedData.filter((item:Reservation)=>item.status === Status.Past));
                    setActiveReservations(fetchedData.filter((item:Reservation)=>item.status === Status.Active));

                    // FIX: Log the variable 'fetchedData', NOT the state 'pastReservations'
                    console.log("Real data from API:", fetchedData);
                    setEdited(false);


                }
                else{
                    console.log("Error occurred")

                }
            }
            catch (error){
                console.error("The error occurred: "+error)
            }
        }
        fetchReservatins();
    },[api_url, edited]);

    return (
        <UserContext.Provider value={{ tab, setTab, activeReservations, pastReservations, setEdited, edited}}>
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