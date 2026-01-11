
export const setItem = (key:string,value:any)=>{
    try{
        sessionStorage.setItem(key, value);
    }
    catch (error){
        console.error("Error saving in localstorage occurred: "+error)
    }
}

export const getItem = (key:string):any|undefined => {
    try{
        const item = sessionStorage.getItem(key);
        return item? item:undefined
    }
    catch (error){
        console.error("Error of getting value from localstorage: "+error)
    }

}