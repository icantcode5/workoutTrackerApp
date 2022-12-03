import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom'
import { StyledButton } from "../components/styles/Button.styled";
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


  const handleDelete = (id) => {
    axios.delete(`http://localhost:5000/viewWorkouts/deleteWorkout/${id}`)
    //don't need a response because our backend successfully handles the delete method. Now we just need to set the workouts array to hold the new workouts minus the one deleted in order to trigger a re-render after we delete a document from the backend. 
    const newWorkouts = workouts.filter((workout) => workout._id !== id)
    setWorkouts(newWorkouts)
  }

  const handleUpdate = () => {
    
  }

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
        <h2>Workout : {workout.title}</h2>
        <p>Date completed : {new Date(workout.created).toDateString()}</p>
        <p>Exercise : {workout.exercise}</p>
        <p>Reps completed: {workout.reps}</p>
        <p>Sets completed: {workout.sets}</p>
        <div>
          <StyledButton color ="green">Edit Workout</StyledButton>
          <StyledButton color = "red" onClick={() => handleDelete(workout._id)}>Delete Workout</StyledButton>
        </div>
        {/* <p>{workout._id}</p> */}
        </StyledDiv>
        )
      })}
    </StyledBlock>

    <StyledFooter>
      <StyledButton onClick={toHomePage}> Go to Home Page</StyledButton>
      <StyledButton onClick={toAddWorkoutPage}>Go to Add a workout Page</StyledButton>
    </StyledFooter>
    </>
  )
}