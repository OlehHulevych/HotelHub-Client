import { Tv, ShowerHead, Wifi } from 'lucide-react';
import styles from './styles/rooms.module.css';
import type {RoomType} from "../../types.ts";
import axios from 'axios';
import {useState, useEffect} from "react";
import RoomDetails from "./RoomDetails.tsx";
import {getItem, setItem} from "../../Helpers/localStorageService.ts";



const RoomListing = () => {
    const [rooms,setRooms] = useState<RoomType[]>([]);
    const [isOpen, setIsOpen] = useState<boolean>(():boolean=>{
        return getItem("room_wind")==="true"
    })
    const [id,setId] = useState(()=>{
        return getItem("room_id") || "";
    });
    const api_url = import.meta.env.VITE_API_URL

    const openDetails  =(id:string):void => {
        setIsOpen(true)
        setId(id);
    }

    const onClose = ()=>{
        setIsOpen(false)
        setId("")
    }

    useEffect(()=>{

            const fetchRooms = async() => {
                try{
                    const response = await axios.get(api_url + "/RoomType")
                    if (response.status==200){
                        const data = response.data.items;
                        console.log(data);
                        setRooms(data);
                    }
                }
                catch (error){
                    console.error("There are error: "+error);
                }

            }

        fetchRooms();

    },[])

    useEffect(() => {
        const update=()=>{
            setItem("room_wind", isOpen)
            console.log(isOpen)
        }

       update();

    }, [isOpen]);


    useEffect(() => {
        setItem("room_id", id)

    }, [id]);
    return (
        <section className={styles.section}>
            <div className={styles.grid}>
                {rooms.map((room) => (
                    <div key={room.id} className={styles.card}>
                        {/* Image Area */}
                        <div className={styles.imageWrapper}>
                            <img
                                src={room.photos[0].uri}
                                alt={room.name}
                                className={styles.image}
                            />
                        </div>

                        <div className={styles.details}>
                            <h3 onClick={()=>openDetails(room.id)} className={styles.title}>{room.name}</h3>
                            <div className={styles.price}>
                                <span className={styles.currency}>$</span>{room.pricePerNight}
                            </div>

                            <div className={styles.cardFooter}>
                                <div className={styles.amenities}>
                                    <div className={styles.iconCircle}>
                                        <Tv size={16} />
                                    </div>
                                    <div className={styles.iconCircle}>
                                        <ShowerHead size={16} />
                                    </div>
                                    <div className={styles.iconCircle}>
                                        <Wifi size={16} />
                                    </div>
                                </div>

                                <button className={styles.bookBtn}>
                                    Book now
                                </button>
                            </div>
                        </div>
                    </div>
                ))}

                {isOpen? <RoomDetails onClose={onClose} id={id} />:""}

            </div>
        </section>
    );
};

export default RoomListing;