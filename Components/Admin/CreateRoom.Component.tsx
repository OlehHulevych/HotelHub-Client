import {type ChangeEvent, type FormEvent, useEffect, useState} from 'react';
import { X } from 'lucide-react';
import styles from './style/createroom.module.css';
import type {RoomType} from "../../types.ts";
import axios from "axios";
import Cookies from "js-cookie";

const CreateRoomModal = ({ isOpen, onClose }:{isOpen:boolean, onClose:()=>void}) => {
    const [roomType, setRoomType] = useState<string>("");
    const [types,setTypes] = useState<RoomType[]|null>(null)
    const [roomNumber, setRoomNumber] = useState('101');

    useEffect(() => {
        const fetchTypes = async () => {
            try{
                const token = Cookies.get("token")
                const response = await axios.get(import.meta.env.VITE_API_URL+ "/RoomType", {
                    headers:{
                        Authorization:`Bearer ${token} `
                    }
                } )
                if(response.status==200){
                    const {items} = response.data
                    setTypes(items);
                }
            }
            catch (error){
                console.error("Error occurred "+error)
            }
        }
        fetchTypes()
    }, []);

    if (!isOpen) return null;

    const handleSubmit = async (e:FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formatData = new FormData(e.currentTarget)
        const token = Cookies.get("token")
        try{
            const response = await axios.post(import.meta.env.VITE_API_URL + "/room", formatData, {
                headers:{
                    "Content-Type":"multipart/form-data",
                    Authorization:`Bearer ${token}`
                }
            })
            if(response.status==200){
                console.log("room is created")
                onClose()
            }
        }
        catch (error){
            console.error("Error occurred "+error)
        }
        // Optional: Reset form

    };



    return (
        <div className={styles.overlay} onClick={onClose}>
            {/* Stop propagation ensures clicking the modal body doesn't close it */}
            <div className={styles.modal} onClick={(e) => e.stopPropagation()}>

                {/* Header */}
                <div className={styles.header}>
                    <h3 className={styles.title}>Create New Room</h3>
                    <button className={styles.closeBtn} onClick={onClose}>
                        <X size={18} />
                    </button>
                </div>

                {/* Body Form */}
                <form onSubmit={handleSubmit}>
                    <div className={styles.body}>

                        {/* Room Type Input */}
                        <div className={styles.inputGroup}>
                            <label className={styles.label}>Room Type</label>
                            <select
                                className={styles.select}
                                value={roomType}
                                name = {"roomTypeId"}
                                onChange={(e:ChangeEvent<HTMLSelectElement>) => setRoomType(e.target.value)}
                                required
                            >
                                {types?.map(type=> (
                                    <option  value={type.id} >{type.name}</option>
                                ))}
                            </select>
                        </div>

                        {/* Room Number Input */}
                        <div className={styles.inputGroup}>
                            <label className={styles.label}>Room Number</label>
                            <input
                                type="text"
                                className={styles.input}
                                value={roomNumber}
                                onChange={(e) => setRoomNumber(e.target.value)}
                                placeholder="e.g. 101"
                                name = "number"
                                required
                            />
                        </div>

                    </div>

                    {/* Footer Buttons */}
                    <div className={styles.footer}>
                        <button
                            type="button"
                            className={`${styles.btn} ${styles.cancelBtn}`}
                            onClick={onClose}
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className={`${styles.btn} ${styles.createBtn}`}
                        >
                            Create Room
                        </button>
                    </div>
                </form>

            </div>
        </div>
    );
};

export default CreateRoomModal;