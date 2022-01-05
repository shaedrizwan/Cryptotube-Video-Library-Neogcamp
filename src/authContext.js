import axios from "axios";
import {createContext,useContext, useEffect, useState} from "react";
import { useLocation,useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const authContext = createContext();



export function useAuth(){
    return useContext(authContext)
}

export function AuthProvider({children}){

    const {state} = useLocation();
    const navigate = useNavigate();

    const [login,setLogin] = useState(false)
    const [token,setToken] = useState(null)

    useEffect(()=>{
        const loginStatus = JSON.parse(localStorage?.getItem("login"));
        loginStatus?.isLogged && setLogin(true);
        loginStatus?.isLogged && setToken(loginStatus.token)
    },[])

    useEffect(()=>{
        (
            function(navigate){
                const UNAUTHORIZED = 401
                axios.interceptors.response.use(
                    (response) => response,
                    (error)=>{
                        if(error?.response?.status === UNAUTHORIZED){
                            logoutHandler();
                            navigate('/login')
                        }
                        return Promise.reject(error)
                    }
                )
            }
        )(navigate)
    },[navigate])


    const loginHandler = async (username,password) =>{
            try{
                const response = await axios.post("https://cryptotube-library.herokuapp.com/user/login",{username,password})
                if(response.status === 200){
                    toast.dark("Logged in successfully!",{
                        position: toast.POSITION.BOTTOM_RIGHT,
                        autoClose: 3000
                    })
                    setLogin(true)
                    setToken(response.data.token)
                    localStorage?.setItem("login",JSON.stringify({isLogged:true,token:response.data.token}))
                    state!= null?navigate(state.from):navigate("/")
                }
            }
            catch{
                toast.error(`Login failed! Invalid Username/Password`,{
                    position: toast.POSITION.BOTTOM_RIGHT,
                    autoClose: 3000
                })
            }
        }

    const logoutHandler = ()=>{
        setLogin(false)
        setToken("")
        localStorage?.removeItem("login")
    }

    return (
    <authContext.Provider value={{login,token,loginHandler,logoutHandler}}>
        {children}
    </authContext.Provider>
    )
}