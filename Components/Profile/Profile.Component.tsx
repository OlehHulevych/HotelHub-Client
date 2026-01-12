import React from 'react';
import {
    CalendarCheck,
    User,
} from 'lucide-react';
import styles from './styles/main.module.css';
import  {useInfo} from "../../context/UserContext.tsx";
import MyReservations from "./MyReservations.Component.tsx";




const Profile = () => {

    const {tab, setTab} = useInfo()
    return (
    <React.Fragment>
        <div className={styles.dashboardContainer}>

            {/* Sidebar Navigation */}
            <aside className={styles.sidebar}>
                <a href="#" className={`${styles.navItem} ${styles.activeNavItem}`} onClick={()=>setTab("reservations")}>
                    <CalendarCheck size={20} />
                    My Reservations
                </a>
                <a href="#" className={styles.navItem} onClick={()=>setTab("profile")}>
                    <User size={20} />
                    My Profile
                </a>

            </aside>

            {tab==="reservations" && <MyReservations/>}

        </div>
    </React.Fragment>

    );
};

export default Profile;