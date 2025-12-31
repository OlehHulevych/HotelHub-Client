import style from "./burger.module.css";
import { RxCross1 } from "react-icons/rx";
import type {Dispatch, SetStateAction} from "react";




const BurrgerMenu = ({isOpen,setIsOpen}:{isOpen:boolean, setIsOpen:Dispatch<SetStateAction<boolean>>}) => {

    return (
        <div className={`${style.burger_menu} ${isOpen?style.active:''}`}>
                <RxCross1 className={style.cross} onClick={()=>setIsOpen(false)}/>
                <div className={style.header}>
                    <img className={style.logo} src="../../public/logo.png" alt=""/>
                </div>
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