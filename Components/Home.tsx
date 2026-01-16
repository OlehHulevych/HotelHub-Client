import Header from "./Header/Header.tsx";
import Footer from "./Footer/Footer.tsx";
import {TabLayout} from "../context/TabContext.tsx";
import Main from "./Main/Main.tsx";
import  "../src/App.css"
import RoomsPage from "./Rooms/Rooms.tsx";
import {AuthLayout} from "../context/AuthContext.tsx";


const Home = () => {

    return (
        <AuthLayout>
            <TabLayout>
                <Header/>
                <Main/>
                <RoomsPage/>
                <Footer/>
            </TabLayout>
        </AuthLayout>
    );
};

export default Home;