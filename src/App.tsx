
import {Route, Routes} from "react-router";
import Home from "../Components/Home.tsx";
import About from "../Components/About.tsx";
import Authorization from "../Components/Authorization/Authorization.tsx";

function App() {
    return (
       <Routes>
           <Route path="/" element={<Home />}/>
           <Route path = "/about" element={<About/>}/>
           <Route path= "/authorize" element={<Authorization/>}/>
       </Routes>
    );
}

export default App;