import Header from "./Header/Header.tsx";
import Footer from "./Footer/Footer.tsx";
import {TabLayout} from "../context/TabContext.tsx";
import Main from "./Main/Main.tsx";
import  "../src/App.css"
import RoomsPage from "./Rooms/Rooms.tsx";
import {AuthLayout} from "../context/AuthContext.tsx";
import AboutUs from "./AboutUs/About.tsx";
import ContactUS from "./ContactUS/ContactUS.tsx";


const Home = () => {

    return (
        <AuthLayout>
            <TabLayout>
                <Header/>
                <Main/>
                <RoomsPage/>
                <ContactUS/>
                <AboutUs/>
                <Footer/>
            </TabLayout>
        </AuthLayout>
    );
};

export default Home;