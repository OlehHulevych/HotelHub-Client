import{ useState } from 'react';
import { MapPin } from 'lucide-react';
import styles from './contact.module.css';
import {useTab} from "../../context/TabContext.tsx";

const ContactUs = () => {
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        message: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };
    const {currentTab} = useTab()
    if(currentTab=="Contact")
    return (
        <div className={styles.container}>

            {/* Hero Section */}
            <section className={styles.hero}>
                <div className={styles.heroOverlay}></div>
                <div className={styles.heroContent}>
                    <h1 className={styles.heroTitle}>Contact us</h1>
                    <p className={styles.heroSubtitle}>
                        The elegant luxury bedrooms in this gallery showcase custom interior
                        designs & decorating ideas. View pictures and find your
                        perfect luxury bedroom design.
                    </p>
                </div>
            </section>

            {/* Form Section */}
            <section className={styles.formSection}>
                <form>
                    {/* Top Row: Fullname & Email */}
                    <div className={styles.row}>
                        <div className={styles.inputGroup}>
                            <label className={styles.label}>Fullname</label>
                            <input
                                type="text"
                                name="fullName"
                                placeholder="e.g John Becker"
                                className={styles.input}
                                value={formData.fullName}
                                onChange={handleChange}
                            />
                        </div>

                        <div className={styles.inputGroup}>
                            <label className={styles.label}>Email</label>
                            <input
                                type="email"
                                name="email"
                                placeholder="johnbecker@gmail.com"
                                className={styles.input}
                                value={formData.email}
                                onChange={handleChange}
                            />
                        </div>
                    </div>

                    {/* Bottom Row: Message */}
                    <div className={styles.inputGroup}>
                        <label className={styles.label}>Message</label>
                        <textarea
                            name="message"
                            placeholder="message"
                            className={styles.textarea}
                            value={formData.message}
                            onChange={handleChange}
                        ></textarea>
                    </div>
                </form>
            </section>

            {/* Map Section */}
            <section className={styles.mapSection}>
                {/* Using a static map image for demonstration as seen in screenshot */}
                <img
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/bd/OpenStreetMap_Logo.svg/1200px-OpenStreetMap_Logo.svg.png"
                    alt="Map location"
                    className={styles.mapImage}
                    // In a real app, replace src with a real map embed or API image
                    // using a placeholder image that looks like a map for now:
                    onError={(e) => {
                        e.target.src = "https://maps.googleapis.com/maps/api/staticmap?center=Coyoacan&zoom=14&size=1000x400&sensor=false&key=YOUR_API_KEY_HERE_IF_AVAILABLE"
                        // Or simpler:
                        e.target.style.backgroundColor = "#e5e3df"; // fallback color
                    }}
                />
                {/* Simulating the pin from the screenshot */}
                <div style={{
                    position: 'absolute',
                    top: '0',
                    left: '0',
                    width: '100%',
                    height: '100%',
                    backgroundImage: 'url("https://mt1.google.com/vt/lyrs=m&x=134&y=298&z=9")', // Generic map tile for visual
                    backgroundSize: 'cover',
                    opacity: 0.6 // Just to blend
                }}></div>

                <MapPin size={48} fill="#d32f2f" color="white" className={styles.mapPin} />
            </section>

        </div>
    );
};

export default ContactUs;