import Header from "./Header/Header.tsx";
import type {ReactNode} from "react";
import {TabLayout} from "../context/TabContext.tsx";


const Home = ({children}:{children:ReactNode}) => {
    return (
        <TabLayout>
            <Header/>
            {children}
        </TabLayout>
    );
};

export default Home;