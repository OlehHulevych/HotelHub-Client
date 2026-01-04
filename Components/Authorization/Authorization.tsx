import {useSearchParams} from "react-router";
import Registration from "./Registration";
import Login from "./Login";
import {useEffect, useState} from "react";
import {AuthLayout} from "../../context/AuthContext.tsx";


const Authorization = () => {
    const [searchParams] = useSearchParams();
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
            <AuthLayout>
                 <Registration/>
            </AuthLayout>
        )
    }
    else{
        return (
            <AuthLayout>
                <Login/>
            </AuthLayout>
        )
    }
};

export default Authorization;