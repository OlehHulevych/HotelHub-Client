
import styles from './about.module.css';
import {useTab} from "../../context/TabContext.tsx";

const AboutUs = () => {
    const {currentTab} = useTab();
    if(currentTab=="About")
    return (
        <div className={styles.container}>

            {/* Hero Section */}
            <section className={styles.hero}>
                <div className={styles.heroOverlay}></div>
                <div className={styles.heroContent}>
                    <h1 className={styles.heroTitle}>About us</h1>
                    <p className={styles.heroSubtitle}>
                        The elegant luxury bedrooms in this gallery showcase custom interior
                        designs & decorating ideas. View pictures and find your
                        perfect luxury bedroom design.
                    </p>
                </div>
            </section>

            {/* Main Content: Manager & Description */}
            <section className={styles.mainContent}>

                {/* Left: Image with Offset Background */}
                <div className={styles.imageColumn}>
                    <div className={styles.imageWrapper}>
                        <div className={styles.decorativeBox}></div>
                        <img
                            src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
                            alt="Chidinma James"
                            className={styles.managerPhoto}
                        />
                    </div>
                    <h3 className={styles.managerName}>Chidinma James (Manager)</h3>
                </div>

                {/* Right: Text Content */}
                <div className={styles.textColumn}>
                    <p>
                        HotelHub is an international hospitality organization founded in 1945. Currently made up of 193 Member States, the PV and its work are guided by the purposes and principles contained in its founding Charter.
                        The Hotel has evolved over the years to keep pace with a rapidly changing world.
                        But one thing has stayed the same: it remains the one place on Earth where all the world’s nations can gather together, discuss common problems, and find shared solutions that benefit all of humanity.
                    </p>
                    <p>
                        The Secretary-General is appointed by the General Assembly on the recommendation of the Security Council for a 5-year, renewable term.
                        The current Secretary-General, and the 9th occupant of the post, is António Guterres of Portugal, who took office on 1 January 2017.
                        On the 18th of June, 2021, Guterres was re-appointed to a second term, pledging as his priority to continue helping the world chart a course out of the COVID-19 pandemic.
                    </p>
                    <p>
                        The United Nations is an international organization founded in 1945. Currently made up of 193 Member States, the UN and its work are guided by the purposes and principles contained in its founding Charter.
                        The UN has evolved over the years to keep pace with a rapidly changing world.
                        But one thing has stayed the same: it remains the one place on Earth where all the world’s nations can gather together, discuss common problems, and find shared solutions.
                    </p>
                </div>
            </section>

            {/* Clients Section */}
            <section className={styles.clientsSection}>
                <h2 className={styles.clientsTitle}>Clients</h2>
                <div className={styles.logoRow}>
                    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/82/NNPC_Logo.svg/1200px-NNPC_Logo.svg.png" alt="NNPC" className={styles.clientLogo} />
                    <img src="https://upload.wikimedia.org/wikipedia/en/thumb/3/37/Nigerian_Society_of_Engineers_Logo.svg/1200px-Nigerian_Society_of_Engineers_Logo.svg.png" alt="NSE" className={styles.clientLogo} />
                    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/United_Nations_logo.svg/1200px-United_Nations_logo.svg.png" alt="UN" className={styles.clientLogo} />
                    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Logo_of_the_Central_Bank_of_Nigeria.svg/1200px-Logo_of_the_Central_Bank_of_Nigeria.svg.png" alt="CBN" className={styles.clientLogo} />
                </div>
            </section>

        </div>
    );
};

export default AboutUs;