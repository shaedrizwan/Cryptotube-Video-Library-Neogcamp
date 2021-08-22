import "../stylesheets/login.css"
import { useAuth } from "../authContext"
import { SemipolarLoading } from 'react-loadingg';
import { useState } from "react";

export function Login(){
    const {login,loginHandler,logoutHandler} = useAuth();
    const [loader,setLoader] = useState(false)
    let username,password;

    function authHandler(){
        if(!login){
            setLoader(true)
            setTimeout(()=>{
                setLoader(false)
            },5000)
        }
        login?logoutHandler():loginHandler(username,password)
    }

    return <>
    <div className="login">
        <div className="login-card">
            <div className="login-title">Login</div>
            { !login && <><div className="login-label">Username</div>
            <input className="login-input" onChange={e => username=e.target.value} type="text"></input>
            <div className="login-label">Password</div>
            <input className="login-input" onChange={e => password=e.target.value} type="password"></input></>}
            {login && <div className="login-label">You're already logged in.</div>}
            <div><button className="login-button" onClick={authHandler}>{login?"Logout":"Login"}</button></div>
            {loader && <SemipolarLoading color="yellow" size="large"/>}
        </div>
    </div>
    </>
}