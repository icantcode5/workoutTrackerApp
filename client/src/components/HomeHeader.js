import React from "react";
import { HomeHeaderStyled } from "./styles/HomeHeader.styled";
import { Link } from "react-router-dom";
import {FaSignInAlt, FaUser} from "react-icons/fa"

export function HomeHeader(){

  return (
    <HomeHeaderStyled>
      <h1>
        Welcome to your Workout Tracker
      </h1>
  
      <ul>
        <li><Link to = "/login"> <FaSignInAlt /> Login</Link></li>
        <li><Link to = "/register"> <FaUser/> Register</Link></li>
      </ul>
    </HomeHeaderStyled>
  )
}