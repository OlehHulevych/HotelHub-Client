import { type FormEvent, useEffect, useState} from 'react';
import { CalendarDays } from 'lucide-react';
import styles from './styles/edit.module.css';
import Cookies from "js-cookie";
import axios from "axios";
import {useInfo} from "../../context/UserContext.tsx";
import {useAdmin} from "../../context/AdminContext.tsx";

const EditComponent = ({ isOpen, onClose, initialStart, initialEnd, reservationId }:{isOpen:boolean, onClose:()=>void, initialStart:Date|null, initialEnd:Date|null, reservationId:string|null}) => {

    const {setReload, reload} = useAdmin()
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const {setEdited} = useInfo();

    useEffect(() => {
        if (initialStart) {
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setStartDate(new Date(initialStart).toISOString().split("T")[0]);
        }
        if (initialEnd) {
            setEndDate(new Date(initialEnd).toISOString().split("T")[0]);
        }
    }, [initialStart, initialEnd]);




    if (!isOpen) return null;

    const handleSaveClick = async(e:FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const token = Cookies.get("token");
        if(token==null){
            return
        }
        const data = new FormData(e.currentTarget);
        const checkIn = data.get("checkIn")
        const checkOut = data.get("checkOut")
        const newData = {
            checkIn:checkIn,
            checkOut:checkOut
        };
        try{
            const response = await axios.put(import.meta.env.VITE_API_URL + "/reservation?id="+reservationId, JSON.stringify(newData), {
                headers:{
                    "Content-Type":"application/json",
                    Authorization:"Bearer "+token
                }
            })
            if(response.status==200){
                setEdited(true)
                setReload(reload+1)
                onClose();
            }
            else{
                console.error("Error occurred, response: "+response)
            }

        }
        catch (error){
            console.error("Error occurred "+error)
        }
    };




    return (
        // Overlay: Clicking outside the modal closes it
        <div className={styles.overlay} onClick={onClose}>
            {/* Modal Container: Stopping propagation prevents closing when clicking inside */}
            <form onSubmit={handleSaveClick} className={styles.modal} onClick={(e) => e.stopPropagation()}>

                {/* Header */}
                <div className={styles.header}>
                    <h3 className={styles.title}>Edit Reservation Period</h3>
                </div>

                {/* Body */}
                <div className={styles.body}>

                    {/* Start Date Input Row */}
                    <div className={styles.inputRow}>
                        <label className={styles.label}>Start Date:</label>
                        <div className={styles.inputWrapper}>
                            <input
                                type="Date"
                                name={"checkIn"}
                                className={styles.input}
                                value={startDate}
                                onChange={(e) => setStartDate(e.target.value)}
                            />
                            <CalendarDays size={20} className={styles.calendarIcon} />
                        </div>
                    </div>

                    {/* End Date Input Row */}
                    <div className={styles.inputRow}>
                        <label className={styles.label}>End Date:</label>
                        <div className={styles.inputWrapper}>
                            <input
                                type="Date"
                                name={"checkOut"}
                                className={styles.input}
                                value={endDate}
                                onChange={(e) => setEndDate(e.target.value)}
                            />
                            <CalendarDays size={20} className={styles.calendarIcon} />
                        </div>
                    </div>

                </div>

                {/* Footer */}
                <div className={styles.footer}>
                    <button className={`${styles.btn} ${styles.cancelBtn}`} onClick={onClose}>
                        Cancel
                    </button>
                    <input type={"submit"}  className={`${styles.btn} ${styles.saveBtn}`} value={"Save"}/>


                </div>

            </form>
        </div>
    );
};

export default EditComponent;