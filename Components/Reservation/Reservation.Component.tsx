import {useState, useEffect, type Dispatch, type SetStateAction, type ChangeEvent} from 'react';
import {Calendar, Tv, ShowerHead, Wifi, Utensils, X} from 'lucide-react';
import styles from './Reservation.module.css';
import Cookies from "js-cookie";
import {useNavigate} from "react-router";
import axios from "axios";
import { setItem} from "../../Helpers/localStorageService.ts";



interface componentProps {
    setIsBooking: Dispatch<SetStateAction<boolean>>,
    setNumber: Dispatch<SetStateAction<number>>,
    setConfirmation: Dispatch<SetStateAction<boolean>>,
    id:string,
    onClose:()=>void,
    photo:string
    price:number
}

const Reservation = ({setIsBooking, onClose, setNumber, id, photo, price, setConfirmation}:componentProps) => {
    const today = new Date();
    const twoDaysLater = new Date(today);
    twoDaysLater.setDate(today.getDate() + 2);

    const formatDate = (date: Date) => date.toISOString().split('T')[0];
    const navigate = useNavigate();
    const [checkIn, setCheckIn] = useState(formatDate(today));
    const [checkOut, setCheckOut] = useState(formatDate(twoDaysLater));
    const [nights, setNights] = useState<number>(2);

    const [totalPrice, setTotalPrice] = useState(price * 2);


    // Recalculate price whenever dates change
    const token = Cookies.get("token");

    useEffect(() => {
        if(token==null){
            navigate("/authorize?type=login");
        }
        const editNights = () => {
            if (checkIn && checkOut) {
                const start = new Date(checkIn);
                const end = new Date(checkOut);
                const diffTime = Math.abs(end.getTime() - start.getTime());
                const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));


                const validNights:number = diffDays > 0 && end > start ? diffDays : 0;

                setNights(validNights);
                setTotalPrice(validNights * price);
            }
        }
        editNights();
    }, [checkIn, checkOut, navigate, price, token]);

    const formHandler = async (e:ChangeEvent<HTMLFormElement>) =>{
        e.preventDefault();
        const formData = new FormData(e.target);
        formData.append("typeId", id);
        console.log(formData.getAll("checkIn"))
        console.log(formData.getAll("checkOut"))

        try{
            const api = import.meta.env.VITE_API_URL
            const response = await axios.post(api+"/reservation",formData,{
                headers:{
                    "Content-Type":"multipart/form-data",
                    Authorization:`Bearer ${token}`
                }
            });
            if(response.status==200){
                console.log(response.data)
                const number:number = response.data.item.room.number
                setNumber(number);
                setConfirmation(true)
                setIsBooking(false)
            }
            else{
                console.log(response.data)
            }

        }
        catch (error){
            console.error(error)
        }
    }

    return (
        <section className={styles.section}>
            <button className={styles.closeButton} onClick={()=>{
                onClose()
                setIsBooking(false)
                setItem("isBooking", false)
            }}>
                <X size={24} />
            </button>
            <form onSubmit={(e:ChangeEvent<HTMLFormElement>)=>formHandler(e)} encType={"multipart/form-data"}  method={"post"} className={styles.container}>

                <h1 className={styles.pageTitle}>Your Reservation</h1>



                <div className={styles.contentWrapper}>

                    {/* Left Column: Room Preview */}
                    <div className={styles.leftColumn}>
                        <span className={styles.columnLabel}>Selected Room</span>
                        <div className={styles.roomCard}>
                            <div className={styles.imageWrapper}>
                                <img
                                    src={photo}
                                    alt="The Royal Room"
                                    className={styles.roomImage}
                                />
                            </div>
                            <div className={styles.roomDetails}>
                                <h3 className={styles.roomTitle}>The Royal Room</h3>
                                <div className={styles.roomPrice}>${price?.toLocaleString()}</div>
                            </div>
                            <div className={styles.amenitiesRow}>
                                <Tv size={18} className={styles.amenityIcon} />
                                <ShowerHead size={18} className={styles.amenityIcon} />
                                <Wifi size={18} className={styles.amenityIcon} />
                                <Utensils size={18} className={styles.amenityIcon} />
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Date Selection & Total */}
                    <div className={styles.rightColumn}>
                        <div className={styles.dateGrid}>

                            {/* Check-in Input */}
                            <div className={styles.inputGroup}>
                                <label className={styles.label}>Check-in Date</label>
                                <div className={styles.inputWrapper}>
                                    <input
                                        type="date"
                                        className={styles.dateInput}
                                        value={checkIn}
                                        name="checkIn"
                                        onChange={(e) => setCheckIn(e.target.value)}
                                    />
                                    {/* Calendar icon is visual only, standard date picker has its own indicator usually */}
                                    <Calendar size={16} className={styles.calendarIcon} />
                                </div>
                            </div>

                            {/* Check-out Input */}
                            <div className={styles.inputGroup}>
                                <label className={styles.label}>Check-out Date</label>
                                <div className={styles.inputWrapper}>
                                    <input
                                        type="date"
                                        className={styles.dateInput}
                                        value={checkOut}
                                        name = "checkOut"
                                        onChange={(e) => setCheckOut(e.target.value)}
                                    />
                                    <Calendar size={16} className={styles.calendarIcon} />
                                </div>
                            </div>

                        </div>

                        {/* Price Summary */}
                        <div className={styles.priceSummary}>
                            <div className={styles.priceRow}>
                                <span className={styles.totalLabel}>Total Price:</span>
                                <span className={styles.totalValue}>${totalPrice.toLocaleString()}</span>
                            </div>
                            <span className={styles.subText}>
                (example based on {nights} {nights === 1 ? 'night' : 'nights'})
              </span>
                        </div>

                        <button type={"submit"} className={styles.bookButton}>
                            Book Now
                        </button>
                        <button onClick={()=>setIsBooking(false)} className={styles.bookButton}>
                            Cancel
                        </button>
                    </div>

                </div>
            </form>
        </section>
    );
};

export default Reservation;