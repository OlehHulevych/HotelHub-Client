import { useState } from 'react';
import { Search } from 'lucide-react';
import styles from './style/room.module.css';
import {useAdmin} from "../../context/AdminContext.tsx";

const Rooms = () => {
    const [activeTab, setActiveTab] = useState('All');
    const {rooms} = useAdmin()

    // Mock Data matching the "Rooms" screenshot


    const getStatusClass = (status:number) => {
        switch (status) {
            case 0: return styles.vacant;
            case 1: return styles.occupied;
            case 2: return styles.maintenance;
            default: return '';
        }
    };

    return (
        <div className={styles.container}>

            {/* Filter Tabs */}


            {/* Main Table Card */}
            <div className={styles.card}>
                <div className={styles.cardHeader}>
                    <h2 className={styles.cardTitle}>Rooms</h2>

                </div>

                <div className={styles.tableContainer}>
                    <table className={styles.table}>
                        <thead>
                        <tr>
                            <th>Photo</th>
                            <th>Room Name</th>
                            <th>Room Number</th>
                            <th>Capacity</th>
                            <th>Price / Night</th>
                            <th>Type</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                        </thead>
                        <tbody>
                        {rooms?.map((room) => (
                            <tr key={room.id}>
                                <td>
                                    <img src={room.type.photos[0].uri} alt={room.type.name} className={styles.roomPhoto} />
                                </td>
                                <td>{room.type.name}</td>
                                <td>{room.number}</td>
                                <td>{room.type.detail.capacity}</td>
                                <td>{room.type.pricePerNight}</td>
                                <td>{room.type.name}</td>
                                <td>
                    <span className={`${styles.badge} ${getStatusClass(room.status)}`}>
                      {room.status}
                    </span>
                                </td>
                                <td>
                                    <div className={styles.actionGroup}>
                                        <button className={`${styles.btn} ${styles.editBtn}`}>Edit</button>
                                        <button className={`${styles.btn} ${styles.deleteBtn}`}>Delete</button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                <div className={styles.pagination}>
                    <button className={`${styles.pageBtn} ${styles.navBtn}`}>Previous</button>
                    <button className={`${styles.pageBtn} ${styles.activePage}`}>1</button>
                    <button className={styles.pageBtn}>2</button>
                    <button className={styles.pageBtn}>3</button>
                    <span style={{ color: '#888', padding: '0 4px' }}>...</span>
                    <span style={{ color: '#888', padding: '0 4px' }}>...</span>
                    <button className={styles.pageBtn}>20</button>
                    <button className={`${styles.pageBtn} ${styles.navBtn}`}>Next</button>
                </div>
            </div>
        </div>
    );
};

export default Rooms;