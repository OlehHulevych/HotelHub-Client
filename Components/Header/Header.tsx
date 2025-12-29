import style from "./header.module.css"
import BurrgerMenu from "./BurrgerMenu.tsx";
const Header = () => {
    return (
        <header className={style.header}>
            <img className={style.logo} src="../../public/logo.png" alt=""/>
            <nav className={style.navbar}>

                    <div className={style.navlink}>Home</div>
                    <div className={style.navlink}>Explore</div>
                    <div className={style.navlink}>Rooms</div>
                    <div className={style.navlink}>About</div>
                    <div className={`${style.navlink}`}>Contact</div>
            </nav>
            <div className={style.button_block}>
                <button className={style.login_button}>Log in</button>
                <div className={style.burgger_menu}>
                    <div className={style.burgger_menu_item}></div>
                    <div className={style.burgger_menu_item}></div>
                    <div className={style.burgger_menu_item}></div>
                </div>
            </div>
            <BurrgerMenu/>
        </header>
    );
};

export default Header;