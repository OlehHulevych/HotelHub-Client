import {type ChangeEvent, type Dispatch,  type SetStateAction, useState} from 'react';
import styles from './styles/password.module.css';
import axios from "axios";
import Cookies from "js-cookie";

const ChangePasswordModal = ({ onClose}:{ onClose:Dispatch<SetStateAction<boolean>>}) => {
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');



    const handleSubmit = async (e:ChangeEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = new FormData(e.target);
        // Logic to validate and save password
        const token = Cookies.get("token");
        console.log(form.get("oldPassword"))
        console.log(form.get("newPassword"))

        if(token==null){
            return;
        }
        try{
            const response = await axios.post(import.meta.env.VITE_API_URL+"/user/changePassword", form, {
                headers:{
                    Authorization:"Bearer "+token,
                    "Content-Type":"multipart/form-data"
                }
            });

            if(response.status==200){
                const {result} = response.data;
                if(result){
                    setCurrentPassword('');
                    setNewPassword('');
                    onClose(false);
                }
            }
            else{
                console.error(`The error occurred with status ${response.status}.Error description ${response.data.message}`)
            }
        }
        catch (error){
            console.log("Error occurred: "+error);
        }


    };

    return (
        <div className={styles.overlay} onClick={()=>onClose(false)}>
            {/* stopPropagation prevents click from closing modal when clicking inside content */}
            <div className={styles.modal} onClick={(e) => e.stopPropagation()}>

                <div className={styles.header}>
                    <h3 className={styles.title}>Change Password</h3>
                </div>

                <form onSubmit={handleSubmit} className={styles.body}>

                    <div className={styles.inputGroup}>
                        <label className={styles.label}>Current Password</label>
                        <input
                            name={"oldPassword"}
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
                            name={"newPassword"}
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