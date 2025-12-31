
import styles from './footer.module.css';

const Footer = () => {
    return (
        <footer className={styles.footer}>
            <div className={styles.container}>

                <div className={styles.topSection}>
                    {/* Column 1: Brand Info */}
                    <div className={styles.brandColumn}>
                        <span className={styles.brandName}>Paradise view</span>
                        <p className={styles.brandText}>
                            The service at the Hotel Monteleone was exceptional. There was absolutely no issue that was not addressed timely and with satisfactory results. We were particularly impressed with how the hotel staff anticipated our needs (periodically coming by the Board Room to check with us)
                        </p>
                    </div>

                    {/* Column 2: Quick links */}
                    <div>
                        <h4 className={styles.columnTitle}>Quick links</h4>
                        <ul className={styles.linkList}>
                            <li><a href="#" className={styles.link}>Room booking</a></li>
                            <li><a href="#" className={styles.link}>Rooms</a></li>
                            <li><a href="#" className={styles.link}>Contact</a></li>
                            <li><a href="#" className={styles.link}>Explore</a></li>
                        </ul>
                    </div>

                    {/* Column 3: Company */}
                    <div>
                        <h4 className={styles.columnTitle}>Company</h4>
                        <ul className={styles.linkList}>
                            <li><a href="#" className={styles.link}>Privacy policy</a></li>
                            <li><a href="#" className={styles.link}>Refund policy</a></li>
                            <li><a href="#" className={styles.link}>F.A.Q</a></li>
                            <li><a href="#" className={styles.link}>About</a></li>
                        </ul>
                    </div>

                    {/* Column 4: Social media */}
                    <div>
                        <h4 className={styles.columnTitle}>Social media</h4>
                        <ul className={styles.linkList}>
                            <li><a href="#" className={styles.link}>Facebook</a></li>
                            <li><a href="#" className={styles.link}>Twitter</a></li>
                            <li><a href="#" className={styles.link}>Instagram</a></li>
                            <li><a href="#" className={styles.link}>Linkedin</a></li>
                        </ul>
                    </div>

                    {/* Column 5: Newsletter */}
                    <div className={styles.newsletterColumn}>
                        <h4 className={styles.columnTitle}>Newsletter</h4>
                        <p className={styles.newsletterText}>
                            Kindly subscribe to our newsletter to get latest deals on our rooms and vacation discount.
                        </p>
                        <div className={styles.inputGroup}>
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className={styles.input}
                            />
                            <button className={styles.subscribeBtn}>
                                Subscribe
                            </button>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className={styles.bottomBar}>
                    Paradise view 2023
                </div>

            </div>
        </footer>
    );
};

export default Footer;