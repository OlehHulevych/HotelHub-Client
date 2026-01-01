import {useTab} from "../../context/TabContext";
import RoomsAndSuites from "./Welcome.tsx";
import RoomListing from "./RoomListing.tsx";


const Rooms = () => {
    const {currentTab} = useTab()
    if(currentTab=="Rooms"){
        return (
            <>
                <RoomsAndSuites/>
                <RoomListing/>
            </>
        );
    }
    return null;

};

export default Rooms;