import styles from "./main.module.css"
import Facilities from "./Facilities.tsx";

import {useTab} from "../../context/TabContext";
import Rooms from "./Rooms.tsx";


const Main = () => {
    const {currentTab} = useTab()
    if(currentTab==="Home"){
        return (
            <>
            <div className={styles.container}>
                <main className={styles.hero}>
                    <div className={styles.content}>
          <span className={styles.scriptText}>
            Paradise View
          </span>

                        <h1 className={styles.heading}>
                            Hotel for every moment rich in emotion
                        </h1>

                        <p className={styles.subtext}>
                            Every moment feels like the first time<br />
                            in paradise view
                        </p>

                        <div className={styles.buttonGroup}>
                            <button className={styles.bookBtn}>
                                Book now
                            </button>

                        </div>
                    </div>

                    {/* Right Column: Image */}
                    <div className={styles.imageWrapper}>
                        <img
                            src="../../public/Main/welcome_hotel_img.png"
                            alt="Tropical resort wooden house with pool"
                            className={styles.heroImage}
                        />
                    </div>

                </main>

            </div>
                <Facilities/>
                <Rooms/>
            </>
        );
    }
    return null;

};

export default Main;