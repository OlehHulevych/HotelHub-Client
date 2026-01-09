import {
    createContext,
    useState,
    type Dispatch,
    type SetStateAction,
    type ReactNode,
    useContext,
    useEffect
} from "react";
import {setItem,getItem} from "../Helpers/localStorageService.ts";

export interface contextTabProps  {
    currentTab:string,
    setCurrentTab:Dispatch<SetStateAction<string>>

}

 export const TabContext = createContext<contextTabProps|undefined>(undefined);

export const TabLayout = ({children}:{children:ReactNode}) => {

    const [currentTab, setCurrentTab] = useState(()=>{
        return getItem("tab") || "Home"
    })
    useEffect(() => {
        setItem("tab", currentTab)
        console.log(currentTab)
    }, [currentTab]);

    return (
        <TabContext.Provider value={{currentTab, setCurrentTab}}>
            {children}
        </TabContext.Provider>
    )
}

export const useTab = () =>{
    const context = useContext(TabContext)
    if(!context){
        throw new Error("The tab context must be used within TabLayout");
    }
    return context
}