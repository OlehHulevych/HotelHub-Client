import styles from "./facilities.module.css"
import {
    Waves,
    Wifi,
    Utensils,
    Dumbbell,
    Gamepad2,
    Lightbulb,
    WashingMachine,
    CircleParking
} from 'lucide-react';
import React from "react";

const facilitiesData = [
    { name: "Swimming Pool", icon: <Waves /> },
    { name: "Wifi", icon: <Wifi /> },
    { name: "Breakfast", icon: <Utensils /> },
    { name: "Gym", icon: <Dumbbell /> },
    { name: "Game center", icon: <Gamepad2 /> },
    { name: "24/7 Light", icon: <Lightbulb /> },
    { name: "Laundry", icon: <WashingMachine /> },
    { name: "Parking space", icon: <CircleParking /> },
];

const Facilities = () => {
    return (
        <div>
            <section className={styles.section}>
                <h2 className={styles.heading}>Our Facilities</h2>
                <p className={styles.subheading}>
                    We offer modern (5 star) hotel facilities for your comfort.
                </p>

                <div className={styles.grid}>
                    {facilitiesData.map((item, index) => (
                        <div key={index} className={styles.card}>
                            <div className={styles.iconWrapper}>
                                {React.cloneElement(item.icon, {
                                    size: 48,
                                    strokeWidth: 1.5
                                })}
                            </div>
                            <span className={styles.label}>{item.name}</span>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default Facilities;