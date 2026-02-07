
import { Plus } from 'lucide-react';
import styles from './style/roomType.module.css';
import {useAdmin} from "../../context/AdminContext.tsx";
import type {RoomType} from "../../types.ts";
import Cookies from "js-cookie";
import axios from "axios";
import {useState} from "react";
import CreateRoomTypeComponent from "./CreateRoomType.Component.tsx";
import EditRoomTypeModal from "./EditRoomType.Component.tsx";

const RoomTypes = () => {

    // Mock Data matching the screenshot rows
    const {roomTypes, reload, setReload} = useAdmin()
    const [isOpen, setIsOpen] = useState(false)
    const [editOpen,setEditOpen] = useState<boolean>(false)
    const [idForEdit, setIdForEdit ] = useState<string>("")
    const [dataForEdit, setDataForEdit] = useState<RoomType|undefined>(undefined)
    
    const deleteHandler = async (id:string) => {
        const token = Cookies.get("token")
        try{
            const response = await axios.delete(import.meta.env.VITE_API_URL + `/RoomType/${id}`,{
                headers:{
                    Authorization:`Bearer ${token}`
                }
            })
            if(response.status==200){
                setReload(reload+1)
                
            }
        }
        catch(error){
            console.error("Error occurred "+error)
        }
    }
    
    const editHandler = (id:string, roomType:RoomType) => {
        setDataForEdit(roomType)
        setIdForEdit(id)
        setEditOpen(true)
    }

    return (
        <>
        <div className={styles.container}>

            {/* Top Header Row */}
            <div className={styles.headerRow}>
                <h1 className={styles.pageTitle}>Room Types</h1>

                <div className={styles.headerActions}>
                    

                    <button onClick={()=>setIsOpen(true)} className={styles.createBtn}>
                        <Plus size={18} /> Create Room Type
                    </button>
                </div>
            </div>

            {/* Main List Card */}
            <div className={styles.card}>
                <h2 className={styles.cardTitle}>Room Types List</h2>

                <div className={styles.tableContainer}>
                    <table className={styles.table}>
                        <thead>
                        <tr>
                            <th>Photo</th>
                            <th>Type Name</th>
                            <th>Capacity</th>
                            <th>Base Price</th>
                            <th>Status</th>
                        </tr>
                        </thead>
                        <tbody>
                        {roomTypes?.map((room:RoomType) => (
                            <tr key={room.id}>
                                <td>
                                    <img src={room.photos[0]} alt={room.name} className={styles.photo} />
                                </td>
                                <td>
                                    <div className={styles.infoCell}>
                                        <span className={styles.typeName}>{room.name}</span>
                                    </div>
                                </td>
                                <td>{room.capacity}</td>
                                <td className={styles.basePrice}>{room.pricePerNight}</td>
                                <td>
                                    <div className={styles.actionGroup}>
                                        <button onClick={()=>editHandler(room.id,room)} className={`${styles.actionBtn} ${styles.editBtn}`}>Edit</button>
                                        <button onClick={()=>deleteHandler(room.id)} className={`${styles.actionBtn} ${styles.deleteBtn}`}>Delete</button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>


            </div>
        </div>
            {isOpen && <CreateRoomTypeComponent isOpen={isOpen} onClose={()=>setIsOpen(false)}/>}
            {editOpen && <EditRoomTypeModal id={idForEdit} isOpen={editOpen}  onClose ={()=>setEditOpen(false)} initialData={dataForEdit}/>}
        </>
    );
};

export default RoomTypes;