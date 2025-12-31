import {createContext, useState, type Dispatch, type SetStateAction, type ReactNode, useContext} from "react";

export interface contextTabProps  {
    currentTab:string,
    setCurrentTab:Dispatch<SetStateAction<string>>
}

 export const TabContext = createContext<contextTabProps|undefined>(undefined);

export const TabLayout = ({children}:{children:ReactNode}) => {
    const [currentTab, setCurrentTab] = useState("Home")
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