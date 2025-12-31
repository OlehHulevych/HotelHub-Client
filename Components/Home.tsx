import Header from "./Header/Header.tsx";
import Footer from "./Footer/Footer.tsx";
import {TabLayout} from "../context/TabContext.tsx";
import Main from "./Main/Main.tsx";



const Home = () => {
    return (
        <TabLayout>
            <Header/>
            <Main/>
            <Footer/>
        </TabLayout>
    );
};

export default Home;