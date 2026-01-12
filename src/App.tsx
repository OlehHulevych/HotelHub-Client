
import {Route, Routes} from "react-router";
import Home from "../Components/Home.tsx";
import About from "../Components/About.tsx";
import Authorization from "../Components/Authorization/Authorization.tsx";
import Profile from "../Components/Profile/Profile.Component.tsx";
import UserLayout from "../context/UserContext.tsx";

function App() {
    return (
       <Routes>
           <Route path="/" element={<Home />}/>
           <Route path = "/about" element={<About/>}/>
           <Route path= "/authorize" element={<Authorization/>}/>
           <Route path= "/authorize" element={<Authorization/>}/>
           <Route path = "/profile" element={
               <UserLayout>
                   <Profile/>
               </UserLayout>
           } />

       </Routes>
    );
}

export default App;