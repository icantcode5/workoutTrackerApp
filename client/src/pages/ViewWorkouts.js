import React from "react";
import { useNavigate } from 'react-router-dom'

export function ViewWorkouts(){
  
  const navigate = useNavigate()

  function toHomePage(e){
    e.preventDefault()
    navigate('/home')
  }

  function toAddWorkoutPage(e){
    e.preventDefault()
    navigate('/addWorkout')
  }


  return(
    <>
    <h1>Here is where we're are going to be able to view our workouts from the past week!</h1>
    <button onClick={toHomePage}> Go to Home Page</button>
    <button onClick={toAddWorkoutPage}>Go to Add a workout Page</button>
    </>
  )
}