import {
    createContext,
    useState,
    type ReactNode,
    useContext,
    useEffect
} from "react";
import Cookies from 'js-cookie';
import axios from "axios";
import {useNavigate} from "react-router";

interface AvatarType {
    id:string,
    userId:string,
    public_id:string,
    avatarPath:string
}
interface User {
    id:string,
    name:string,
    avatarUser:AvatarType,
    email:string,
    reservations:never[]
}

interface contextPropsType  {
    isLogged:boolean,
    user:User|null,
    registration:(FormData:FormData)=>Promise<void>|string
    login:(FormData:FormData)=>Promise<void>|string;
    logout:()=>void;
}

const AuthContext = createContext<contextPropsType|undefined>(undefined);



export const AuthLayout = ({children}:{children:ReactNode}) => {
    const api_url = import.meta.env.VITE_API_URL
    const navigate = useNavigate();
    const [isLogged, setIsLogged] = useState(false);
    const [user, setUser] = useState<User|null>(null);
    const registration = async (formData:FormData) => {
        const password = formData.get("password")
        const confirmPassword = formData.get("confirmPassword")
        if(password!==confirmPassword){
            return "The passwords don`t match"
        }
        formData.delete("confirmPassword");
        try{
            const response = await axios.post(api_url+"/user/register", formData ,{
                headers:{
                    "Content-Type":"multipart/form-data"
                }
            })

            if(response.status==200){
                navigate("/authorize?type=login")
            }
            else{
                const {message} = response.data;
                return message;
            }

        }
        catch(error){
            console.error("Error occured: "+ error);
        }

    }
    const login = async (formData:FormData) => {
        try{
            const response = await axios.post(api_url+ "/user/login", formData, {
                headers:{
                    "Content-Type":"multipart/form-data"
                }
            })
            if(response.status==200){
                const {token} = response.data;
                Cookies.set("token", token, {
                    path: "/",
                    expires: 7,
                    sameSite: "lax",
                    secure:true

                })
                navigate("/")
            }
            else{
                const {message} = response.data
                return message;
            }
        }
        catch (error){
            console.error("Error occured: "+error )
        }
    }

    const logout = () =>{
        Cookies.remove("token");
        navigate("/");
    }
    useEffect(()=>{
        const checkIfAuthorizeHandler = async():Promise<void> =>{
            const token = Cookies.get("token");
            console.log(token)
            if(token!=null){
                try{
                    const response = await axios.get(api_url+"/user/me",{
                        headers:{
                            Authorization:"Bearer "+token
                        }
                    })
                    if(response.status==200){
                        const data = response.data;
                        setUser(data.user);
                        console.log(user)
                        setIsLogged(true)
                    }
                }
                catch (error){
                    console.error("Error occured: "+error)
                }


            }
        }

        checkIfAuthorizeHandler();
    },[])

    return(
        <AuthContext.Provider value={{ isLogged, user, registration,login, logout }}>
            {children}
        </AuthContext.Provider>
    )

}

export const useAuth = () => {
    const context = useContext(AuthContext);
    if(!context){
        throw new Error("The context must be use within AuthLayout");
    }
    return context
}