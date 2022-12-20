import React from "react"
import {Link} from 'react-router-dom'
import { Footer } from "../components/Footer"
import { GlobalStyles } from "../components/styles/Global"
import { StyledButton } from "../components/styles/Button.styled"

export function Home(){

  

  return(
    <>
    <GlobalStyles />
    <h1>This is the Home Page!!! Should be login Page!!!</h1>
    <Footer>
      <Link to = "/viewWorkouts"><StyledButton color="navy">Go to View Workouts Page</StyledButton></Link>
      <Link to = "/addWorkout"> <StyledButton color="navy">Go to add Workout Page</StyledButton></Link>
    </Footer>
    </>
  )
}