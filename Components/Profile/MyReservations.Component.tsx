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

    useEffect(() => {
        const getReservations = () =>{
            if(activeTab===Past){

                setReservations(pastReservations);


            }
            else{
                setReservations(activeReservations);


            }
        }
        getReservations();
    },[activeTab]);
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
            <h2 className={styles.pageTitle}>Past Reservations</h2>

            <div className={styles.listContainer}>
                {reservations?.map((reservation:Reservation) => (
                    <div key={reservation.Id} className={styles.card}>

                        {/* Left: Image */}
                        <div className={styles.cardImageWrapper}>
                            <img src={reservation.Room.Type?.photos[0].uri} alt={reservation.Room.Type?.name} className={styles.cardImage} />
                        </div>

                        {/* Middle: Info */}
                        <div className={styles.cardInfo}>
                            <h3 className={styles.roomName}>{reservation.Room.Type?.name}</h3>
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
                            <div className={styles.stars}>
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <Star key={star} size={14} className={styles.starIcon} />
                                ))}
                            </div>
                            <span className={styles.dateRange}>{reservation.checkInDate.toISOString()}</span>
                        </div>

                    </div>
                ))}
            </div>

        </main>
    );
};

export default MyReservations;