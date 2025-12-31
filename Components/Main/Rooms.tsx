
import styles from './rooms.module.css'


const roomsData = [
    {
        id: 1,
        image: "https://images.unsplash.com/photo-1611892440504-42a792e24d32?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    },
    {
        id: 2,
        image: "https://images.unsplash.com/photo-1590490360182-c33d57733427?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    },
    {
        id: 3,
        image: "https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    },
];

const Rooms = () => {
    return (
        <section className={styles.section}>
            {/* Dark Overlay */}
            <div className={styles.overlay}></div>

            <div className={styles.container}>
                <h2 className={styles.heading}>Luxurious Rooms</h2>
                <div className={styles.separator}></div>
                <p className={styles.subheading}>All rooms are designed for your comfort</p>

                <div className={styles.grid}>
                    {roomsData.map((room) => (
                        <div key={room.id} className={styles.card}>
                            <div className={styles.imageContainer}>
                                <img
                                    src={room.image}
                                    alt="Luxurious hotel room interior"
                                    className={styles.roomImage}
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Rooms;