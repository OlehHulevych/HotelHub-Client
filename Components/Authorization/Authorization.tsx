import {useSearchParams} from "react-router";
import Registration from "./Registration";
import Login from "./Login";
import {useEffect, useState} from "react";


const Authorization = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [type,setType] = useState<string|null>("login");
    useEffect(()=>{
        const getType = () => {
            const value = searchParams.get("type")
            console.log(value)
            setType(value);
        }
        getType();
    },[searchParams])
    if(type==="registration"){
        return (
            <Registration/>
        )
    }
    else{
        return (
            <Login/>
        )
    }
};

export default Authorization;