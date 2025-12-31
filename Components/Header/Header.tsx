import style from "./header.module.css"
import BurrgerMenu from "./BurrgerMenu.tsx";
import { useState} from "react";
import {useTab} from "../../context/TabContext.tsx";

const Header = () => {
    const [isOpen,setIsOpen] = useState(false);
    const {currentTab, setCurrentTab} = useTab();

    return (
            <header className={style.header}>
                <img className={style.logo} src="../../public/logo.png" alt=""/>
                <nav className={style.navbar}>
                        <div onClick={()=>setCurrentTab("Home")} className={`${style.navlink} ${currentTab==="Home"? style.active:""}`}>Home</div>
                        <div onClick={()=>setCurrentTab("Explore")} className={`${style.navlink} ${currentTab==="Explore"? style.active:""}`}>Explore</div>
                        <div onClick={()=>setCurrentTab("Rooms")} className={`${style.navlink} ${currentTab==="Rooms"? style.active:""}`}>Rooms</div>
                        <div onClick={()=>setCurrentTab("About")} className={`${style.navlink} ${currentTab==="About"? style.active:""}`}>About</div>
                        <div onClick={()=>setCurrentTab("Contact")} className={`${style.navlink} ${currentTab==="Contact"? style.active:""}`}>Contact</div>
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