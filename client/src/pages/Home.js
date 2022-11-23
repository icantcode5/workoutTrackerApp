import React from "react"
import {useNavigate} from 'react-router-dom'
import { GlobalStyles } from "../components/styles/Global"

export function Home(){

  const navigate = useNavigate()

  function toCreateAWorkoutPage(e){
    e.preventDefault()
    navigate('/addWorkout')
  }

  function toAddWorkoutPage(e){
    e.preventDefault()
    navigate('/viewWorkouts')
  }

  return(
    <>
    <GlobalStyles />
    <div> Welcome to the home page. Here are your workouts from the past Week!</div>
    <button onClick={toCreateAWorkoutPage}>Navigate to Create a Workout</button>
    <button onClick={toAddWorkoutPage}>Navigate to view workouts from the past week!</button>
    </>
  )
}