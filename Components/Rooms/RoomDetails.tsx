import  { useEffect, useState} from 'react';
import {
    X, Tv, Bath, Wifi, Utensils, Users, ShowerHead, Eye, Coffee,
    ChevronLeft, ChevronRight
} from 'lucide-react';
import styles from './styles/RoomDetails.module.css';
import type {RoomType} from "../../types.ts";
import axios from "axios";
import Reservation from "../Reservation/Reservation.Component.tsx";
import Confirmation from "./Confirmation.tsx";



const RoomDetails = ({ onClose, id }:{onClose:()=>void, id:string}) => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [roomType, setRoomType] = useState<RoomType|undefined>(undefined);
    const [isBooking, setIsBooking] = useState<boolean>(false);
    const [confirmation,setConfirmation] = useState<boolean>(false)
    const [number,setNumber] = useState<number>(0);

    useEffect(() => {
        const fetchRoom = async () => {
            if(id!==""){
                try{
                    const api = import.meta.env.VITE_API_URL
                    const response = await axios.get(`${api}/RoomType?id=${id}`);
                    if(response.status==200){
                        const {item} = response.data
                        setRoomType(item);

                    }
                }
                catch (error){
                    console.error(error)
                }
            }
            else{
                console.log("There is no id")
            }

        }
        fetchRoom();
    }, []);

    const nextImage = () => {
        setCurrentImageIndex((prevIndex) =>
            roomType && prevIndex === roomType.photos.length - 1 ? 0 : prevIndex + 1
        );
    };

    const prevImage = () => {
        setCurrentImageIndex((prevIndex) =>
            roomType && prevIndex === 0 ? roomType.photos.length - 1 : prevIndex - 1
        );
    };

    return (
        <>
        <div className={styles.overlay}>

            {roomType!=null && !isBooking && !confirmation?  <div className={styles.modal}>
                {/* LEFT COLUMN */}
                <div className={styles.leftColumn}>
                    <div className={styles.imageContainer}>

                        {/* The Track: Moves left/right based on index */}
                        <div
                            className={styles.sliderTrack}
                            style={{ transform: `translateX(-${currentImageIndex * 100}%)` }}
                        >
                            {roomType.photos.map((src, index) => (
                                <div key={index} className={styles.slide}>
                                    <img
                                        src={src.uri}
                                        alt={`Room view ${index + 1}`}
                                        className={styles.roomImage}
                                    />
                                </div>
                            ))}
                        </div>

                        {/* Navigation Arrows */}
                        <button className={`${styles.sliderArrow} ${styles.sliderArrowLeft}`} onClick={prevImage}>
                            <ChevronLeft size={24} />
                        </button>
                        <button className={`${styles.sliderArrow} ${styles.sliderArrowRight}`} onClick={nextImage}>
                            <ChevronRight size={24} />
                        </button>

                        {/* Counter */}
                        <div className={styles.photoCounter}>
                            {currentImageIndex + 1} / {roomType.photos.length}
                        </div>
                    </div>

                    <div className={styles.mainInfo}>
                        <div className={styles.titleRow}>
                            <div>
                                <h2 className={styles.roomTitle}>The {roomType.name}</h2>
                                <div className={styles.price}>${roomType.pricePerNight}</div>
                            </div>

                        </div>

                        <p className={styles.description}>
                            {roomType?.description}
                        </p>

                        <button onClick={()=>setIsBooking(true)} className={styles.bookButton}>
                            Book from  ${roomType?.pricePerNight}
                        </button>
                    </div>
                </div>

                {/* RIGHT COLUMN (Unchanged) */}
                <div className={styles.rightColumn}>
                    <button className={styles.closeButton} onClick={()=>onClose()}>
                        <X size={24} />
                    </button>

                    <h3 className={styles.sectionTitle}>Hotel Amenities</h3>
                    <div className={styles.amenitiesGrid}>
                        <div className={styles.amenityItem}>
                            <div className={styles.iconCircle}><Tv size={24} /></div>
                            <span className={styles.amenityLabel}>TV</span>
                        </div>
                        <div className={styles.amenityItem}>
                            <div className={styles.iconCircle}><Bath size={24} /></div>
                            <span className={styles.amenityLabel}>Bath tube</span>
                        </div>
                        <div className={styles.amenityItem}>
                            <div className={styles.iconCircle}><Wifi size={24} /></div>
                            <span className={styles.amenityLabel}>24H stable wifi</span>
                        </div>
                        <div className={styles.amenityItem}>
                            <div className={styles.iconCircle}><Utensils size={24} /></div>
                            <span className={styles.amenityLabel}>Free Breakfast</span>
                        </div>
                    </div>

                    <h3 className={styles.sectionTitle}>Room highlights</h3>
                    <div className={styles.highlightsGrid}>
                        <div className={styles.highlightItem}>
                            <Users className={styles.highlightIcon} size={20} />
                            <div className={styles.highlightText}>
                                <h4>Occupancy</h4>
                                <p>{roomType.detail.capacity}</p>
                            </div>
                        </div>
                        <div className={styles.highlightItem}>
                            <ShowerHead className={styles.highlightIcon} size={20} />
                            <div className={styles.highlightText}>
                                <h4>Bathroom</h4>
                                {roomType.detail.spa.map((item:string)=>(
                                    <p>{item}</p>
                                ))}
                            </div>
                        </div>
                        {roomType.detail.view.length>0 ?<div className={styles.highlightItem}>
                            <Eye className={styles.highlightIcon} size={20} />
                            <div className={styles.highlightText}>
                                <h4>View</h4>
                                {roomType.detail.view.map((item:string)=>(
                                    <p>{item}</p>
                                ))}
                            </div>
                        </div>:" "}

                        <div className={styles.highlightItem}>
                            <Coffee className={styles.highlightIcon} size={20} />
                            <div className={styles.highlightText}>
                                <h4>Nourishment</h4>
                                {roomType.detail.norishment.map((item:string)=>(
                                    <p>{item}</p>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>:""}
            {isBooking? <Reservation onClose={onClose} setNumber = {setNumber} setIsBooking = {setIsBooking} id={id} photo = {roomType?.photos[0].uri} price = {roomType?.pricePerNight} setConfirmation={setConfirmation}   />: "" }
            {!isBooking && confirmation ? <Confirmation room={roomType?.name} number={number} onClose = {onClose}  />:""}
        </div>

            </>
    );
};

export default RoomDetails;