import  { useEffect } from 'react';
import { Check} from 'lucide-react';
import styles from './notification.module.css';

const Notification = ({ message, onClose, duration = 3000 }:{message:string, onClose:()=>void, duration?:number}) => {

    // Auto-dismiss logic
    useEffect(() => {
        const timer = setTimeout(() => {
            onClose();
        }, duration);

        return () => clearTimeout(timer);
    }, [onClose, duration]);

    return (
        <div className={styles.toast}>
            <div className={styles.iconWrapper}>
                <Check size={14} strokeWidth={3}/>
            </div>
            <span className={styles.message}>{message}</span>
        </div>
    );
};

export default Notification;