import { useState } from 'react';
import { Plus } from 'lucide-react';
import styles from './style/room.module.css';
import {useAdmin} from "../../context/AdminContext.tsx";
import CreateRoomComponent from "./CreateRoom.Component.tsx";
import axios from "axios";
import Cookies from "js-cookie";
import Notification from "../Notification/Notification.Component.tsx";

const Rooms = () => {
    const [currentPage, setCurrentPage] = useState(1)
    const {rooms, roomMaxPages, setRoomPage, roomLengths, setRoomStatus, roomStatus, setReload, reload } = useAdmin()
    const [openCreate, setOpenCreate] = useState<boolean>(false)
    const [notification, setNotification] = useState<string|null>(null)


    const changePage = (nextPage:number)=>{
        setRoomPage(nextPage)
        setCurrentPage(nextPage)
    }

    const putInMaitenanceHandler = async (id:string) => {
        try{
            const token = Cookies.get("token");
            const response = await axios.patch(import.meta.env.VITE_API_URL+ `/room?id=${id}`,{}, {
                headers:{
                    "Content-Type":"application/json",
                     Authorization:`Bearer ${token}`

                }
            });
            if(response.status==200){
                const {message} = response.data;
                setNotification(message)
                setReload(reload+1)
            }
            else{
                const {message} = response.data
                setNotification(message)
            }


        }
        catch (error){
            console.error("Error occurred "+error);

        }
    }

    const deleteHandler = async(id:string) => {
        const token = Cookies.get("token");
        try {
            const response = await axios.delete(import.meta.env.VITE_API_URL + `/room?id=${id}`, {
                headers:{
                    "Content-Type":"application/json",
                    Authorization:`Bearer ${token}`
                }
            })
            if(response.status==200){
                const {message} = response.data
                setNotification(message)
                setReload(reload+1)
            }
        }
        catch (error){
            console.error("Error occurred "+error)
        }
    }




    const getStatusClass = (status:number) => {
        switch (status) {
            case 0: return styles.vacant;
            case 2: return styles.occupied;
            case 3: return styles.maintenance;
            default: return '';
        }
    };

    const getStatus = (status:number) => {
        switch (status){
            case 0: return "Free";
            case 2: return "Occupied";
            case 3: return "Maintenance";
            default: return '';
        }
    }

    return (
        <>
        <div className={styles.container}>

            {/* Filter Tabs */}
            <div className={styles.tabsContainer}>
                <button
                    className={`${styles.tab} ${roomStatus === null ? styles.activeTab : ''}`}
                    onClick={() => {
                        setRoomStatus(null)
                    }}
                >
                    All <span className={styles.count}>{roomLengths.totalRoomLength}</span>
                </button>
                <button
                    className={`${styles.tab} ${roomStatus==0 ? styles.activeTab : ''}`}
                    onClick={() =>{
                        setRoomStatus(0)
                    } }
                >
                    Free <span className={styles.count}>{roomLengths.freeRoomLength}</span>
                </button>
                <button
                    className={`${styles.tab} ${roomStatus==2 ? styles.activeTab : ''}`}
                    onClick={() => {

                        setRoomStatus(2)
                    }}
                >
                    Occupied <span className={styles.count}>{roomLengths.occupiedRoomLength}</span>
                </button>
                <button
                    className={`${styles.tab} ${roomStatus==3 ? styles.activeTab : ''}`}
                    onClick={() =>{
                        setRoomStatus(3)
                    } }
                >
                    Maintenance <span className={styles.count}>{roomLengths.maintenanceRoomLength}</span>
                </button>
            </div>

            {/* Main Table Card */}
            <div className={styles.card}>
                <div className={styles.cardHeader}>
                    <h2 className={styles.cardTitle}>Rooms</h2>
                    <button onClick={()=>setOpenCreate(true)} className={styles.createBtn}>
                        <Plus size={18} /> Create Room
                    </button>
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
                                    <img src={room.photo} alt={room.name} className={styles.roomPhoto} />
                                </td>
                                <td>{room.name}</td>
                                <td>{room.number}</td>
                                <td>{room.capacity}</td>
                                <td>{room.pricePerNight}$</td>
                                <td>{room.name}</td>
                                <td>
                    <span className={`${styles.badge} ${getStatusClass(room.status)}`}>
                      {getStatus(room.status)}
                    </span>
                                </td>
                                <td>
                                    <div className={styles.actionGroup}>
                                        <button onClick={()=>putInMaitenanceHandler(room.id)} className={`${styles.btn} ${styles.maintenanceBtn}`}>Put in Maintenance</button>
                                        <button onClick={()=>deleteHandler(room.id)} className={`${styles.btn} ${styles.deleteBtn}`}>Delete</button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                <div className={styles.pagination}>
                    <button disabled={currentPage==1} onClick={()=>changePage(currentPage-1)} className={`${styles.pageBtn} ${styles.navBtn}`}>Previous</button>
                    {Array.from({length:roomMaxPages},(_,i=1)=>i+1).map((page)=>(
                        <button onClick={()=>changePage(page)} className={`${styles.pageBtn} ${currentPage==page? styles.activePage:''}`}>{page}</button>
                    ))}
                    <button disabled={currentPage == roomMaxPages} onClick={()=>changePage(currentPage+1)} className={`${styles.pageBtn} ${styles.navBtn}`}>Next</button>
                </div>
            </div>
        </div>
            {openCreate && <CreateRoomComponent isOpen={openCreate} onClose={()=>setOpenCreate(false)}/>}
            {notification && <Notification message={notification} onClose={()=>setNotification(null)} />}
        </>
    );
};

export default Rooms;