
import {Check, X} from 'lucide-react';
import styles from './styles/Confirmation.module.css';

const Confirmation = ({number, room, onClose}:{number:number|undefined, room:string|undefined, onClose:()=>void}) => {
    return (
        <div className={styles.container}>

            <div className={styles.card}>
                <button className={styles.closeButton} onClick={()=>onClose()}>
                    <X size={24} />
                </button>
                <div className={styles.iconCircle}>
                    <Check size={40} className={styles.checkIcon} />
                </div>

                <h2 className={styles.title}>Reservation Confirmed!</h2>

                <p className={styles.message}>
                    Your booking for <strong>The {room}</strong> is set.
                </p>

                <p className={styles.subMessage}>
                    The number of your room is <strong>{number}</strong> You can see your reservation in your profile.
                </p>
            </div>
        </div>
    );
};

export default Confirmation;