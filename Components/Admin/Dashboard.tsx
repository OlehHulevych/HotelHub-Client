import {
    LayoutDashboard,
    CalendarDays,
    BedDouble,
    Users,
    Briefcase,
    Bed,
    UserCheck,
    DoorOpen
} from 'lucide-react';
import styles from './style/dashboard.module.css';
import {AdminTabs, useAdmin} from "../../context/AdminContext.tsx";
import Reservations from "./Reservations.tsx";
import UserLayout from "../../context/UserContext.tsx";

const HotelDashboard = () => {
    const {occupiedRooms, availableRooms, workers, guests, setTab, tab} = useAdmin()
    // Mock Data for Table


    const getStatusClass = (status:boolean) => {
        switch (status) {
            case true: return styles.statusOnDuty;
            case false: return styles.statusOffDuty;
            default: return '';
        }
    };

    return (
        <div className={styles.container}>

            {/* Sidebar Navigation */}
            <aside className={styles.sidebar}>
                <div className={styles.sidebarHeader}>
                    <LayoutDashboard size={24} color="#333" /> Dashboard
                </div>

                <nav className={styles.navMenu}>
                    <a href="#" onClick={()=>setTab(AdminTabs.Dashboard)} className={`${styles.navItem} ${tab===AdminTabs.Dashboard && styles.activeNavItem}`}>
                        <LayoutDashboard size={18} /> Dashboard
                    </a>
                    <a href="#" onClick={()=>setTab(AdminTabs.Reservations)} className={`${styles.navItem} ${tab===AdminTabs.Reservations && styles.activeNavItem}`}>
                        <CalendarDays size={18} /> Reservations
                    </a>
                    <a href="#" onClick={()=>setTab(AdminTabs.Rooms)} className={`${styles.navItem} ${tab===AdminTabs.Rooms && styles.activeNavItem}`}>
                        <BedDouble size={18} /> Rooms
                    </a>
                    <a href="#" className={styles.navItem}>
                        <Users size={18} /> Guests
                    </a>
                    <a href="#" className={styles.navItem}>
                        <Briefcase size={18} /> Staff
                    </a>

                </nav>


            </aside>

            {/* Main Content */}
            {tab===AdminTabs.Dashboard && (<main className={styles.mainContent}>

                {/* Hotel Overview Section */}
                <h2 className={styles.sectionTitle}>Hotel Overview</h2>

                <div className={styles.topStatsRow}>

                    <div className={`${styles.statCard} ${styles.redStat}`}>
                        <div className={styles.iconBox}><Bed size={24} /></div>
                        <div className={styles.statInfo}>
                            <span className={styles.statNumber}>{occupiedRooms}</span>
                            <span className={styles.statLabel}>Occupied Rooms</span>
                        </div>
                    </div>

                    <div className={`${styles.statCard} ${styles.greenStat}`}>
                        <div className={styles.iconBox}><DoorOpen size={24} /></div>
                        <div className={styles.statInfo}>
                            <span className={styles.statNumber}>{availableRooms}</span>
                            <span className={styles.statLabel}>Available Rooms</span>
                        </div>
                    </div>

                    <div className={`${styles.statCard} ${styles.blueStat}`}>
                        <div className={styles.iconBox}><Briefcase size={24} /></div>
                        <div className={styles.statInfo}>
                            <span className={styles.statNumber}>{workers?.length}</span>
                            <span className={styles.statLabel}>Workers</span>
                        </div>
                    </div>

                    <div className={`${styles.statCard} ${styles.purpleStat}`}>
                        <div className={styles.iconBox}><Users size={24} /></div>
                        <div className={styles.statInfo}>
                            <span className={styles.statNumber}>{guests?.length}</span>
                            <span className={styles.statLabel}>Guests</span>
                        </div>
                    </div>



                </div>

                {/* Staff Overview Sub-header & Stats */}
                <h3 className={styles.subTitle}>Staff Overview</h3>

                <div className={styles.middleStatsRow}>
                    <div className={styles.midCard}>
                        <Users size={32} className={styles.midIcon} />
                        <div className={styles.statInfo}>
                            <span className={styles.midNumber}>{workers.length}</span>
                            <span className={styles.statLabel}>Active Staff</span>
                        </div>
                    </div>

                    <div className={styles.midCard}>
                        <UserCheck size={32} className={styles.midIcon} />
                        <div className={styles.statInfo}>
                            <span className={styles.midNumber}>{workers.filter(worker=>worker.onDuty).length}</span>
                            <span className={styles.statLabel}>On Duty</span>
                        </div>
                    </div>
                </div>

                {/* Staff Table */}
                <div className={styles.tableContainer}>
                    <div className={styles.tableHeader}>
                        <h4 className={styles.tableTitle}>Staff Overview</h4>

                    </div>

                    <table className={styles.table}>
                        <thead>
                        <tr>
                            <th>Photo</th>
                            <th>Name</th>
                            <th>Role</th>
                            <th>Status</th>



                        </tr>
                        </thead>
                        <tbody>
                        {workers.map((staff) => (
                            <tr key={staff.id}>
                                <td>
                                    <img src={staff.avatarUser?.avatarPath} alt={staff.name} className={styles.avatar} />
                                </td>
                                <td>
                                    <div className={styles.userInfo}>
                                        <span className={styles.userName}>{staff.name}</span>
                                        <span className={styles.userRoleSub}>{staff.position}</span>
                                    </div>
                                </td>
                                <td>{staff.position}</td>

                                <td>
                    <span className={`${styles.badge} ${getStatusClass(staff.onDuty)}`}>
                        {staff.onDuty?"On Duty":"Off Duty"}
                    </span>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>



            </main>)}
            {tab===AdminTabs.Reservations && <UserLayout>
                <Reservations/>
            </UserLayout>}
        </div>
    );
};

export default HotelDashboard;