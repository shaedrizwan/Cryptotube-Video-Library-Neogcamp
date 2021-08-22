import React,{useState} from 'react'
import "../stylesheets/Register.css"
import {SemipolarLoading} from "react-loadingg"
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import {toast} from "react-toastify"

function Register() {

    const [loader,setLoader] = useState(false)
    const [error,setError] = useState('')
    const navigate = useNavigate()
    let newUser = {
        firstName: "",
        lastName: "",
        email: "",
        username: "",
        password: ""
    }

    const RegisterPressed = async () =>{
        setLoader(true)
        setTimeout(()=>{
            setLoader(false)
        },5000)
        try{
            const response = await axios.post('https://cryptotube-backend.herokuapp.com/user/signup',newUser)
            if(response.status === 200){
                toast.success('Registered successfully',{
                    position:toast.POSITION.BOTTOM_RIGHT,
                    autoClose: 3000
                })
                navigate('/login')
            }
            else{
                setError("Error in Registering")
            }
        }catch(err){
                setError(err.message)
            }
    }

    return (
    <div className="register">
        <div className="register-card">
            <div className="register-title">register</div>
            <div className="register-label">First Name</div>
            <input className="register-input" onChange={e => newUser.firstName=e.target.value} type="text"></input>
            <div className="register-label">Last Name</div>
            <input className="register-input" onChange={e => newUser.lastName=e.target.value} type="text"></input>
            <div className="register-label">Email</div>
            <input className="register-input" onChange={e => newUser.email=e.target.value} type="text"></input>
            <div className="register-label">Username</div>
            <input className="register-input" onChange={e => newUser.username=e.target.value} type="text"></input>
            <div className="register-label">Password</div>
            <input className="register-input" onChange={e => newUser.password=e.target.value} type="password"></input>
            <div><button className="register-button" onClick={RegisterPressed}>Register</button></div>
            {error && <div className="register-error">{error}</div>}
            {loader && <SemipolarLoading color="yellow" size="large"/>}
        </div>
    </div>
    )
}

export default Register
