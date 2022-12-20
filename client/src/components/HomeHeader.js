import React from "react";
import { HomeHeaderStyled } from "./styles/HomeHeader.styled";
import { Link } from "react-router-dom";
import {FaSignInAlt, FaUser} from "react-icons/fa"
import { useState } from "react"

export function HomeHeader({children}){

  const logoutHandler = () => {
    if(localStorage.getItem('token')){
      localStorage.removeItem("token")
    }
  }

  return (
    <>
    <HomeHeaderStyled>
      <h1>
        Welcome To Your Workout Tracker
      </h1>
  
      <ul>
        {localStorage.getItem("token") ? <li> <Link to = "/login" onClick={logoutHandler}> <FaSignInAlt /> Logout</Link></li> : <li><Link to = "/login"> <FaSignInAlt /> Login</Link></li>}
        
        <li><Link to = "/register"> <FaUser/> Register</Link></li>
      </ul>
    </HomeHeaderStyled>
    </>
  )
}