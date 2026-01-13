import {useEffect, useState} from 'react';
import styles from "./styles/main.module.css"
import {Tv,
    ShowerHead,
    Wifi,
    Star} from "lucide-react"
import {useInfo} from "../../context/UserContext.tsx";
import type {Reservation} from "../../types.ts";
import {Status} from "../../types.ts";

const MyReservations = () => {


    const {Active, Past} = Status
    const [activeTab, setActiveTab] = useState(Active);
    const {pastReservations, activeReservations} = useInfo();
    const [reservations, setReservations] = useState<Reservation[]|undefined>(activeReservations)

    const formatDate= (dateInput)=> {
        const date = new Date(dateInput);
        const number = date.getDate();
        const month = date.toLocaleString('default', {month:"short"});
        return `${number} ${month}`
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
                    <div key={reservation.Id} className={styles.card}>

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
                        </div>

                        {/* Right: Rating & Date */}
                        <div className={styles.cardRight}>

                            <span className={styles.dateRange}>{formatDate(reservation.checkInDate)} - {formatDate(reservation.checkOutDate)} </span>
                        </div>

                    </div>
                )):"" }

            </div>

        </main>
    );
};

export default MyReservations;