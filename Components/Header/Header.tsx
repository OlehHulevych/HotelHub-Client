import style from "./header.module.css"
import BurrgerMenu from "./BurrgerMenu.tsx";
import {useState} from "react";

const Header = () => {
    const [isOpen,setIsOpen] = useState(false);
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
                <div onClick={()=>setIsOpen(true)} className={style.burgger_menu}>
                    <div className={style.burgger_menu_item}></div>
                    <div className={style.burgger_menu_item}></div>
                    <div className={style.burgger_menu_item}></div>
                </div>
            </div>
            <BurrgerMenu isOpen={isOpen} setIsOpen={setIsOpen}/>
        </header>
    );
};

export default Header;