import {useState} from 'react';
import styles from './style/reservationPanel.module.css';
import {useAdmin} from "../../context/AdminContext.tsx";
import Cookies from "js-cookie";
import axios from "axios";
import {Status} from "../../types.ts";
import EditComponent from "../Profile/EditReservation.Component.tsx";

const Reservations = () => {
    const {reservations, reservationMaxPages,reservationPage, setReservationPage, setReload, reload ,lengths, setStatus, status} = useAdmin()
    const cancelReservationHandler=async(id:string)=>{
        const token = Cookies.get("token")
        if(token==null){
            return
        }
        try{
            const response = await axios.delete(import.meta.env.VITE_API_URL+`/reservation?id=${id}`,{
                headers:{
                    Authorization:`Bearer ${token}`
                }
            })
            if(response.status==200){
                setReload(reload+1)
            }
        }
        catch (error){
            console.error(error)
        }

    }
    const editHandler = (id:string, checkIn:Date|null, checkOut:Date|null)=>{
        setOpenEdit(true)
        setEditReservationId(id)
        setEditCheckIn(checkIn)
        setEditCheckOut(checkOut)
    }


    const [editReservationId, setEditReservationId] = useState<string>("")
    const [editCheckIn, setEditCheckIn] = useState<Date|null>(null)
    const [editCheckOut, setEditCheckOut] = useState<Date|null>(null)
    const [currentPage,setCurrentPage] = useState<number>(reservationPage);
    const [openEdit, setOpenEdit] = useState<boolean>(false)

    const changePage = (nextPage:number)=>{
        setReservationPage(nextPage)
        setCurrentPage(nextPage)
    }
    const formatDate= (dateInput:any)=> {
        const date = new Date(dateInput);
        const number = date.getDate();
        const month = date.toLocaleString('default', {month:"short"});
        return `${number} ${month}`
    }


    // Mock Data matching the screenshot

    const getStatusStyle = (status:string) => {
        switch (status) {
            case 'Upcoming': return styles.upcoming;
            case 'Canceled': return styles.canceled;
            case 'Checked In': return styles.checkedIn;
            default: return '';
        }
    };

    return (
        <>
        <div className={styles.container}>
            <h1 className={styles.pageTitle}>Reservations</h1>

            {/* Filter Tabs */}
            <div className={styles.tabsContainer}>
                <button
                    className={`${styles.tab} ${status === null ? styles.activeTab : ''}`}
                    onClick={() => setStatus(null)}
                >
                    All <span className={styles.count}>{lengths.totalReservationLength}</span>
                </button>
                <button
                    className={`${styles.tab} ${status== Status.Active ? styles.activeTab : ''}`}
                    onClick={() => setStatus(Status.Active)}
                >
                    Upcoming <span className={styles.count}>{lengths.activeReservationLength}</span>
                </button>
                <button
                    className={`${styles.tab} ${status === Status.Past ? styles.activeTab : ''}`}
                    onClick={() => setStatus(Status.Past)}
                >
                    Canceled <span className={styles.count}>{lengths.canceledReservationLength}</span>
                </button>
            </div>

            {/* Main Table Card */}
            <div className={styles.card}>
                <div className={styles.cardHeader}>
                    <h2 className={styles.cardTitle}>Reservations</h2>
                </div>

                <div className={styles.tableContainer}>
                    <table className={styles.table}>
                        <thead>
                        <tr>
                            <th>Guest Name</th>
                            <th>Room Number</th>
                            <th>Status</th>
                            <th>Check-In</th>
                            <th>Check-Out</th>
                            <th>Actions</th>
                        </tr>
                        </thead>
                        <tbody>
                        {reservations.map((row) => (
                            <tr key={row.id}>
                                <td>{row.user.name}</td>
                                <td>{row.room.number}</td>
                                <td>
                    <span className={`${styles.badge} ${getStatusStyle(row.status)}`}>
                      {row.status}
                    </span>
                                </td>
                                <td>{formatDate(row.checkInDate)}</td>
                                <td>{formatDate(row.checkOutDate)}</td>
                                <td>
                                    <div className={styles.actionGroup}>
                                        <button onClick={()=>editHandler(row.id, row.checkInDate, row.checkOutDate)} className={`${styles.btn} ${styles.viewBtn}`}>Edit</button>
                                        <button onClick={()=>cancelReservationHandler(row.id)} className={`${styles.btn} ${styles.cancelActionBtn}`}>Cancel</button>
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
                    {Array.from({length:reservationMaxPages},(_,i=1)=>i+1).map((page)=>(
                        <button onClick={()=>changePage(page)} className={`${styles.pageBtn} ${currentPage==page? styles.activePage:''}`}>{page}</button>
                    ))}
                    <button disabled={currentPage == reservationMaxPages} onClick={()=>changePage(currentPage+1)} className={`${styles.pageBtn} ${styles.navBtn}`}>Next</button>
                </div>
            </div>
        </div>
            {openEdit && <EditComponent isOpen={openEdit} onClose={()=>setOpenEdit(false)} initialStart={editCheckIn} initialEnd={editCheckOut} reservationId={editReservationId}/>}
            </>
    );
};

export default Reservations;