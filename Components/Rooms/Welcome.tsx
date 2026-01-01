import { ArrowDown } from 'lucide-react';
import styles from './styles/main.module.css';

const RoomsAndSuites = () => {
    return (
        <section className={styles.section}>
            <div className={styles.overlay}></div>

            <div className={styles.content}>
                <h1 className={styles.title}>Rooms and Suites</h1>
                <p className={styles.description}>
                    The elegant luxury bedrooms in this gallery showcase custom interior designs & decorating ideas. View pictures and find your perfect luxury bedroom design.
                </p>

                <div className={styles.scrollIndicator}>
                    <ArrowDown className={styles.arrowIcon} color="white" size={24} />
                </div>
            </div>
        </section>
    );
};

export default RoomsAndSuites;