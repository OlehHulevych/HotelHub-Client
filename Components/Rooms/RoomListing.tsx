import { Tv, ShowerHead, Wifi } from 'lucide-react'; // Make sure to npm install lucide-react
import styles from './styles/rooms.module.css';
import {useState, useEffect} from "react";


const RoomListing = () => {
    const [rooms,setRooms] = useState<Array<>>([]);
    return (
        <section className={styles.section}>
            <div className={styles.grid}>
                {/*{rooms.map((room) => (*/}
                {/*    <div key={room.id} className={styles.card}>*/}
                {/*        /!* Image Area *!/*/}
                {/*        <div className={styles.imageWrapper}>*/}
                {/*            <img*/}
                {/*                src={room.image}*/}
                {/*                alt={room.title}*/}
                {/*                className={styles.image}*/}
                {/*            />*/}
                {/*        </div>*/}

                {/*        /!* Content Area *!/*/}
                {/*        <div className={styles.details}>*/}
                {/*            <h3 className={styles.title}>{room.title}</h3>*/}
                {/*            <div className={styles.price}>*/}
                {/*                <span className={styles.currency}>₦</span>{room.price}*/}
                {/*            </div>*/}

                {/*            <div className={styles.cardFooter}>*/}
                {/*                <div className={styles.amenities}>*/}
                {/*                    <div className={styles.iconCircle}>*/}
                {/*                        <Tv size={16} />*/}
                {/*                    </div>*/}
                {/*                    <div className={styles.iconCircle}>*/}
                {/*                        <ShowerHead size={16} />*/}
                {/*                    </div>*/}
                {/*                    <div className={styles.iconCircle}>*/}
                {/*                        <Wifi size={16} />*/}
                {/*                    </div>*/}
                {/*                </div>*/}

                {/*                <button className={styles.bookBtn}>*/}
                {/*                    Book now*/}
                {/*                </button>*/}
                {/*            </div>*/}
                {/*        </div>*/}
                {/*    </div>*/}
                {/*))}*/}
            </div>
        </section>
    );
};

export default RoomListing;