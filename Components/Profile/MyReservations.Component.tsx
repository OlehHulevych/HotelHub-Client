import {useEffect, useState} from 'react';
import styles from "./styles/main.module.css"
import {Edit, ShowerHead, Trash2, Tv, Wifi} from "lucide-react"
import {useInfo} from "../../context/UserContext.tsx";
import {type Reservation, Status} from "../../types.ts";
import EditComponent from "./EditReservation.Component.tsx";
import Cookies from "js-cookie";
import axios from "axios";

const MyReservations = () => {


    const {Active, Past} = Status
    const [activeTab, setActiveTab] = useState(Active);
    const {pastReservations, activeReservations} = useInfo();
    const [reservations, setReservations] = useState<Reservation[]|undefined>(activeReservations)

    const [reservationId, setReservationId] = useState<string|null>(null);
    const [editCheckIn, setEditCheckIn] = useState<Date|null>(null);
    const [editCheckOut, setEditCheckOut] = useState<Date|null>(null);
    const [editClose, setEditClose] =useState<boolean>(false);
    const {setEdited} = useInfo();

    const onClose = () => {
        setEditCheckIn(null)
        setEditCheckOut(null)
        setReservationId(null)
        setEditClose(false)
    }

    const setEditReservation = (checkIn:Date, checkOut:Date, reservationId:string, ) =>{
        console.log(reservationId)
        setReservationId(reservationId)
        setEditCheckOut(checkOut)
        setEditCheckIn(checkIn);
        setEditClose(true)
    }


    const formatDate= (dateInput:any)=> {
        const date = new Date(dateInput);
        const number = date.getDate();
        const month = date.toLocaleString('default', {month:"short"});
        return `${number} ${month}`
    }

    const cancelRerservationHandler = async ( id:string) => {
        const token = Cookies.get("token");
        if(token==null){
            return;
        }
        try{
            const response = await axios.delete(import.meta.env.VITE_API_URL+"/reservation?id="+id, {
                headers:{
                    "Content-Type":"application/json",
                    Authorization:"Bearer "+token
                }
            });
            if(response.status==200){
                setEdited(true);
            }
            else{
                console.log(response);
            }
        }
        catch(error){
            console.error("Error occurred: "+error)
        }
    }

    useEffect(() => {
        const getReservations = () =>{
            if(activeTab===Past){

                setReservations(pastReservations);
                console.log("Hello nigga")

            }
            else{
                setReservations(activeReservations);
                console.log("Hello nigga")


            }
        }
        getReservations();
    },[Past, activeReservations, activeTab, pastReservations]);

    return (
        <main className={styles.mainContent}>

            {/* Tabs */}
            <div className={styles.tabContainer}>
                <button
                    className={`${styles.tab} ${activeTab === Active ? styles.activeTab : ''}`}
                    onClick={() => setActiveTab(Active)}
                >
                    Active
                </button>
                <button
                    className={`${styles.tab} ${activeTab === Past ? styles.activeTab : ''}`}
                    onClick={() => setActiveTab(Past)}
                >
                    Past
                </button>
            </div>

            {/* List Section */}
            <h2 className={styles.pageTitle}>{activeTab===Past?"Past":"Active"} Reservations</h2>

            <div className={styles.listContainer}>
                {reservations!== undefined && reservations?.length>0 ? reservations?.map((reservation) => (
                    <div  key={reservation.id} className={styles.card}>

                        {/* Left: Image */}
                        <div className={styles.cardImageWrapper}>
                            <img src={reservation.room.type?.photos[0].uri} alt={reservation.room.type?.name} className={styles.cardImage} />
                        </div>

                        {/* Middle: Info */}
                        <div className={styles.cardInfo}>
                            <h3 className={styles.roomName}>{reservation.room.type?.name}</h3>
                            <div className={styles.price}>{reservation.TotalPrice}</div>

                            {/* Amenities Icons */}
                            <div className={styles.amenities}>
                                <Tv size={16} className={styles.icon} />
                                <ShowerHead size={16} className={styles.icon} />
                                <Wifi size={16} className={styles.icon} />
                            </div>
                            {reservation.status !== Status.Past && (<div className={styles.actionButtons}>
                                <button onClick={()=>setEditReservation(reservation.checkInDate, reservation.checkOutDate, reservation.id)} className={`${styles.actionBtn} ${styles.editBtn}`}>
                                    <Edit size={14} /> Edit
                                </button>
                                <button onClick={()=>cancelRerservationHandler(reservation.id)} className={`${styles.actionBtn} ${styles.cancelBtn}`}>
                                    <Trash2 size={14} /> Cancel
                                </button>
                            </div>)}

                        </div>



                        {/* Right: Rating & Date */}
                        <div className={styles.cardRight}>

                            <span className={styles.dateRange}>{formatDate(reservation.checkInDate)} - {formatDate(reservation.checkOutDate)} </span>
                        </div>

                    </div>
                )):"" }

            </div>
            {editClose &&  <EditComponent  onClose={onClose} isOpen={editClose} initialStart={editCheckIn} initialEnd={editCheckOut} reservationId={reservationId}/>}
        </main>
    );
};

export default MyReservations;