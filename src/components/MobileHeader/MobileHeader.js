import React, { useState } from 'react'
import "./MobileHeader.css"
import logo from '../../logo.png'
import MenuIcon from '@material-ui/icons/Menu';
import {NavLink} from "react-router-dom";

function MobileHeader() {
    const [dropdownToggle,setDropdownToggle] = useState(false)
    return (
        <div className="mobile-header">
            <img src={logo} className="mobile-logo" alt="Cryptotube"/>
            <MenuIcon onClick={()=>setDropdownToggle(toggle=>!toggle)} className="hamburger"/>
            {dropdownToggle && 
                <div className="dropdown-menu">
                    <NavLink onClick={()=>setDropdownToggle(toggle=>!toggle)} className="nav-links" to="/">Home</NavLink>
                    <NavLink onClick={()=>setDropdownToggle(toggle=>!toggle)} className="nav-links" to="playlist">Playlist</NavLink>
                    <NavLink onClick={()=>setDropdownToggle(toggle=>!toggle)} className="nav-links" to="watch-later">Watch Later</NavLink>
                    <NavLink onClick={()=>setDropdownToggle(toggle=>!toggle)} className="nav-links" to="liked-videos">Liked Videos</NavLink>
                    <NavLink onClick={()=>setDropdownToggle(toggle=>!toggle)} className="nav-links" to="history">History</NavLink>
                    <NavLink onClick={()=>setDropdownToggle(toggle=>!toggle)} className="nav-links" to="login">Login</NavLink>
                    <NavLink onClick={()=>setDropdownToggle(toggle=>!toggle)} className="nav-links" to="register">Register</NavLink>
                </div>}
        </div>
    )
}

export default MobileHeader
