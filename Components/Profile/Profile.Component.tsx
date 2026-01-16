import React from 'react';
import {
    CalendarCheck,
    User,
} from 'lucide-react';
import styles from './styles/main.module.css';
import  {useInfo} from "../../context/UserContext.tsx";
import MyReservations from "./MyReservations.Component.tsx";
import {Link} from "react-router";
import {userTabs} from "../../types.ts";
import UserProfile from "./User.Component.tsx";





const Profile = () => {
    const {tab, setTab} = useInfo()

    const {Reservations, Info} = userTabs
    return (
    <React.Fragment>
        <div className={styles.dashboardContainer}>

            {/* Sidebar Navigation */}
            <aside className={styles.sidebar}>
                <Link to={"/"}>
                    <img className={styles.logo} src="../../public/big_logo.jpg" alt=""/>
                </Link>
                <a href="#" className={`${styles.navItem} ${tab==Reservations? `${styles.navItem} ${styles.activeNavItem}`: `${styles.navItem}`} `} onClick={()=>setTab("reservations")}>
                    <CalendarCheck size={20} />
                    My Reservations
                </a>
                <a href="#" className={`${styles.navItem} ${tab==Info? `${styles.navItem} ${styles.activeNavItem}`: `${styles.navItem}`} `} onClick={()=>setTab("profile")}>
                    <User size={20} />
                    My Profile
                </a>

            </aside>

            {tab===Reservations && <MyReservations/>}
            {tab===Info && <UserProfile/>}

        </div>
    </React.Fragment>

    );
};

export default Profile;