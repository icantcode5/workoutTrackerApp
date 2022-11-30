import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom'
import { StyledBlock } from "../components/styles/DisplayWorkout.styled";
import { StyledDiv } from "../components/styles/Div.styled";
import { StyledFooter } from "../components/styles/Footer.styled";
import { StyledHeader } from "../components/styles/Header.styled";

export function ViewWorkouts(){
  const navigate = useNavigate()

  const [workouts, setWorkouts] = useState([])
  
  useEffect(() => {
   axios.get("http://localhost:5000/viewWorkouts")
   .then(response => setWorkouts(response.data))
  },[])

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
    <StyledHeader>
    <h1>Here is where we're are going to be able to view our workouts from the past week!</h1>
    </StyledHeader>
    <StyledBlock>
      {workouts.map((workout,i) => {
        return(
      <StyledDiv key = {i}>
        <h1>{workout.title}</h1>
        <p>{workout.exercise}</p>
        <p>{workout.reps}</p>
        <p>{workout.sets}</p>
        <p>{workout._id}</p>
        </StyledDiv>
        )
      })}
    </StyledBlock>
    <StyledFooter>
    <button onClick={toHomePage}> Go to Home Page</button>
    <button onClick={toAddWorkoutPage}>Go to Add a workout Page</button>
    </StyledFooter>
    </>
  )
}