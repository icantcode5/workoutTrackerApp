import React from "react"
import {Link} from 'react-router-dom'
import { Footer } from "../components/Footer"
import { GlobalStyles } from "../components/styles/Global"

export function Home(){

  

  return(
    <>
    <GlobalStyles />
    <h1>This is the Home Page!!! Should be login Page!!!</h1>
    <Footer>
      <Link to = "/addWorkout">Go to Add Workout Page</Link>
      <Link to = "/viewWorkouts">Go to View Workouts Page</Link>
    </Footer>
    </>
  )
}