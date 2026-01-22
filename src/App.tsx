
import {Route, Routes} from "react-router";
import Home from "../Components/Home.tsx";
import Authorization from "../Components/Authorization/Authorization.tsx";
import Profile from "../Components/Profile/Profile.Component.tsx";
import UserLayout from "../context/UserContext.tsx";
import {AuthLayout} from "../context/AuthContext.tsx";

function App() {
    return (
       <Routes>
           <Route path="/" element={<Home />}/>
           <Route path= "/authorize" element={<Authorization/>}/>
           <Route path= "/authorize" element={<Authorization/>}/>
           <Route path = "/profile" element={
               <AuthLayout>
                   <UserLayout>
                       <Profile/>
                   </UserLayout>
               </AuthLayout>
           } />

       </Routes>
    );
}

export default App;