
import {Route, Routes} from "react-router";
import Home from "../Components/Home.tsx";
import About from "../Components/About.tsx";

function App() {
    return (
       <Routes>
           <Route path="/" element={<Home />}/>
           <Route path = "/about" element={<About/>}/>
       </Routes>
    );
}

export default App;