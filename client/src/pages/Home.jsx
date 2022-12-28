import React from "react"
import {Link} from 'react-router-dom'
import { Footer } from "../components/Footer"
import { GlobalStyles } from "../components/styles/Global"
import { StyledButton } from "../components/styles/Button.styled"
import { StyledHeader } from "../components/styles/Header.styled"
import { MdOutlineFitnessCenter} from "react-icons/md"

export function Home(){

  

  return(
    <>
    <GlobalStyles />
    <StyledHeader>
      <h1>Welcome to the Workout out Tracker Buddy <MdOutlineFitnessCenter /> </h1>
    </StyledHeader>
    <Footer>
      <Link to = "/login"><StyledButton color="navy">Login</StyledButton></Link>
      <Link to = "/register"> <StyledButton color="navy">Register</StyledButton></Link>
    </Footer>
    </>
  )
}