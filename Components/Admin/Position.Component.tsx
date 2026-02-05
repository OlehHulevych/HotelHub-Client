import {type ChangeEvent, useState} from 'react';
import { X } from 'lucide-react';
import styles from './style/position.module.css';
import Cookies from "js-cookie";
import axios from "axios";
import {useAdmin} from "../../context/AdminContext.tsx";

const SetPositionModal = ({ isOpen, onClose, userId}:{isOpen:boolean, onClose:()=>void, userId:string}) => {
    const [position, setPosition] = useState('');
    const {reload, setReload} = useAdmin()

    if (!isOpen) return null;


    const handleSubmit = async (e:ChangeEvent<HTMLFormElement>) => {
        e.preventDefault();
        const token = Cookies.get("token");
        const formData = new FormData(e.currentTarget)
        try{
            const response = await axios.post(import.meta.env.VITE_API_URL+`/user/promote/${userId}`,formData, {
                headers:{
                    Authorization:`Bearer ${token}`,
                }
            })
            if (response.status==200){
                onClose()
                setReload(reload+1)
            }
        }
        catch (error){
            console.error("Error occurred: "+error)
        }

    };

    return (
        <div className={styles.overlay} onClick={onClose}>
            <div className={styles.modal} onClick={(e) => e.stopPropagation()}>

                {/* Header */}
                <div className={styles.header}>
                    <h3 className={styles.title}>Set Position</h3>
                    <button className={styles.closeBtn} onClick={onClose}>
                        <X size={16} />
                    </button>
                </div>

                {/* Form Body */}
                <form onSubmit={handleSubmit}>
                    <div className={styles.body}>
                        <div className={styles.inputGroup}>
                            <label className={styles.label}>Position</label>
                            <input
                                type="text"
                                className={styles.input}
                                name={"position"}
                                value={position}
                                onChange={(e) => setPosition(e.target.value)}
                                placeholder="Type position..."
                                autoFocus
                                required
                            />
                        </div>
                    </div>

                    {/* Footer */}
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
                            className={`${styles.btn} ${styles.saveBtn}`}
                        >
                            Save
                        </button>
                    </div>
                </form>

            </div>
        </div>
    );
};

export default SetPositionModal;