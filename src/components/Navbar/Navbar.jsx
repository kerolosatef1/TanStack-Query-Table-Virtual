import React from "react";
import { NavLink } from "react-router-dom";

export default function Navbar() {
    return <>
    <div className="flex justify-between  bg-gray-200">
    <ul className="flex  gap-4 p-4 ">
        
        <li><NavLink to="/"> Home </NavLink></li>
        <li>About</li>
        <li>Services</li>
    </ul>
    <ul className="flex  gap-4 p-4">
        <li> <NavLink to='/login'>Login</NavLink> </li>
        <li> <NavLink to='/register'>Register</NavLink> </li>
    </ul>
    </div>
    </>
 
}