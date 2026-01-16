import {type Dispatch, type FormEvent, type SetStateAction, useState} from 'react';
import styles from './styles/password.module.css';
import axios from "axios";

const ChangePasswordModal = ({ onClose}:{ onClose:Dispatch<SetStateAction<boolean>>}) => {
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');



    const handleSubmit = async (e:FormEvent) => {
        e.preventDefault();
        // Logic to validate and save password
        const token = Cookies.get("token");
        if(token==null){
            return;
        }
        try{
            const response = await axios.post(import.meta.env.VITE_API_URL+"/user/changePassword");
        }
        catch (error){
            console.log("Error occurred: "+error);
        }

        // Reset fields and close
        setCurrentPassword('');
        setNewPassword('');
        onClose(false);
    };

    return (
        <div className={styles.overlay} onClick={()=>onClose(false)}>
            {/* stopPropagation prevents click from closing modal when clicking inside content */}
            <div className={styles.modal} onClick={(e) => e.stopPropagation()}>

                {/* Brown Header */}
                <div className={styles.header}>
                    <h3 className={styles.title}>Change Password</h3>
                </div>

                {/* Content Form */}
                <form onSubmit={handleSubmit} className={styles.body}>

                    <div className={styles.inputGroup}>
                        <label className={styles.label}>Current Password</label>
                        <input
                            type="password"
                            className={styles.input}
                            placeholder="........."
                            value={currentPassword}
                            onChange={(e) => setCurrentPassword(e.target.value)}
                            required
                        />
                    </div>

                    <div className={styles.inputGroup}>
                        <label className={styles.label}>New Password</label>
                        <input
                            type="password"
                            className={styles.input}
                            placeholder="........."
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            required
                        />
                    </div>

                    <div className={styles.footer}>
                        <button type="submit" className={`${styles.btn} ${styles.saveBtn}`}>
                            Save Password
                        </button>
                        <button
                            type="button"
                            className={`${styles.btn} ${styles.cancelBtn}`}
                            onClick={()=>onClose(false)}
                        >
                            Cancel
                        </button>
                    </div>

                </form>
            </div>
        </div>
    );
};

export default ChangePasswordModal;