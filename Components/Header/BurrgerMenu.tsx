import style from "./burger.module.css";

const BurrgerMenu = () => {
    return (
        <div className={style.burger_menu}>
            <img className={style.logo} src="../../public/logo.png" alt=""/>
            <nav className={style.navbar}>
                <div className={style.navlink}>Home</div>
                <div className={style.navlink}>Explore</div>
                <div className={style.navlink}>Rooms</div>
                <div className={style.navlink}>About</div>
                <div className={`${style.navlink}`}>Contact</div>
                <button className={style.login_button}>Log in</button>
            </nav>
        </div>
    );
};

export default BurrgerMenu;